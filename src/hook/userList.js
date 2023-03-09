import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MqttContext } from "../context/Mqtt";
import { UserContext } from "../context/User";
import { EMQTTEvent } from "../utils/constants";
import { allowUserWrite, getRoom, kickUser } from "../utils/request";

export const useUserList = ({ roomId }) => {
  const [userList, setUserList] = useState([]);
  const { client } = useContext(MqttContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    refreshUserList(roomId);

    return () => {
      setUserList(() => []);
    };
  }, [roomId]);

  useEffect(() => {
    client.subscribe(EMQTTEvent.JOIN_ROOM + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subscribed to ${EMQTTEvent.DRAW + roomId}`);
    });
    client.subscribe(EMQTTEvent.RAISE_HAND + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.RAISE_HAND + roomId}`);
    });
    client.subscribe(EMQTTEvent.KICK + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.KICK + roomId}`);
    });
    client.subscribe(EMQTTEvent.CHOOSEN + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.RAISE_HAND + roomId}`);
    });
    // message handling

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      console.log(data, topic);
      switch (topic) {
        case EMQTTEvent.JOIN_ROOM + roomId: {
          const user = data.data.user;
          setUserList((u) => {
            return [...u.filter((i) => i._id !== user._id), user];
          });
          toast(`user ${user.name} joined`);
          break;
        }
        case EMQTTEvent.RAISE_HAND + roomId: {
          setUserList((u) => {
            return u.map((e) => {
              if (e._id === data.userId) {
                e.isRaisedHand = data.raiseHand;
              }
              return e;
            });
          });
          break;
        }
        case EMQTTEvent.KICK + roomId: {
          const userId = data.data.toKick;
          setUserList((u) => {
            return u.filter((e) => e._id !== userId);
          });
          if (userId === userInfo._id) {
            navigate("/");
            toast(`You are kicked!`);
          }
          break;
        }

        default:
          return;
      }
    });
  }, [roomId]);

  const raiseHand = async (roomId, raiseHand = true) => {
    return client.publish(
      EMQTTEvent.RAISE_HAND + roomId,
      JSON.stringify({ userId: userInfo._id, raiseHand })
    );
  };
  const chooseWriter = async ({ roomId, userId }) => {
    return allowUserWrite(roomId, userId);
  };
  const kick = async ({ roomId, isAdmin, userId }) => {
    const { success } = await kickUser(roomId, userId);
    if (success) {
      if (!isAdmin) navigate("/");
    }
  };
  const refreshUserList = async (roomId) => {
    const res = await getRoom(roomId);
    if (res.data) {
      setUserList(res.data.participant);
    }
  };

  return { userList, raiseHand, kick, chooseWriter, refreshUserList };
};
