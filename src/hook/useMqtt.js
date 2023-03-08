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

    client.on("message", (topic, message) => {
      switch (topic) {
        case EMQTTEvent.DRAW + roomId:
          setPayload((val) => ({
            ...val,
            [EMQTTEvent.DRAW + roomId]: JSON.parse(message.toString())["data"],
          }));
          break;
        case EMQTTEvent.RAISE_HAND + roomId:
          setPayload((val) => ({
            ...val,
            [EMQTTEvent.RAISE_HAND + roomId]: JSON.parse(message.toString())[
              "data"
            ],
          }));
          break;
      }
    });
  }, [roomId]);

  return payload;
};
