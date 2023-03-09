import React, { useContext, useEffect, useState } from "react";
import { MqttContext } from "../context/Mqtt";
import { EMQTTEvent } from "../utils/constants";

export const useMqtt = (roomId) => {
  const { client } = useContext(MqttContext);
  const [payload, setPayload] = useState({});

  useEffect(() => {
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

    client.on("message", (topic, message) => {
      switch (topic) {
        case EMQTTEvent.DRAW + roomId:
          setPayload((val) => ({
            ...val,
            [EMQTTEvent.DRAW + roomId]: JSON.parse(message.toString())["data"],
          }));
          break;
        case EMQTTEvent.EMPTY_BOARD + roomId:
          {
            console.log(topic,message);
            const canvas = document.getElementById("draw-canvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
          }
      }
    });
  }, [roomId]);

  return payload;
};
