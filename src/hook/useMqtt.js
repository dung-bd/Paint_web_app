import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MqttContext } from "../context/Mqtt";
import { EMQTTEvent } from "../utils/constants";
import { getRoom } from "../utils/request";

export const useMqtt = (roomId, adminId, userId) => {
  const { client } = useContext(MqttContext);
  const [draw, setDraw] = useState({});
  const [choosen, setChoosen] = useState(false);

  useEffect(() => {
    console.log("13 ---", adminId, userId);

    client.subscribe(EMQTTEvent.DRAW + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subscribed to ${EMQTTEvent.DRAW + roomId}`);
    });

    client.subscribe(EMQTTEvent.RAISE_HAND + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.RAISE_HAND + roomId}`);
    });
    client.subscribe(EMQTTEvent.EMPTY_BOARD + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.EMPTY_BOARD + roomId}`);
    });

    client.on("message", async (topic, message) => {
      switch (topic) {
        case EMQTTEvent.DRAW + roomId: {
          setDraw((val) => ({
            ...val,
            ...JSON.parse(message.toString())["data"],
          }));
          break;
        }
        case EMQTTEvent.EMPTY_BOARD + roomId: {
          const canvas = document.getElementById("draw-canvas");
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          break;
        }
        case EMQTTEvent.CHOOSEN + roomId: {
          const res = JSON.parse(message.toString())["data"];

          if (adminId !== userId) {
            console.log("45 ---", adminId, userId);
            if (userId === res.userId) {
              toast("You can draw now");
              setChoosen(() => true);
            } else {
              toast("You are no longer permitted to draw");
              setChoosen(() => false);
            }
          }
        }
      }
    });
  }, [roomId]);

  return { draw, choosen };
};
