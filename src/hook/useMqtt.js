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

    client.on("message", (topic, message) =>
      setPayload((val) => ({ ...val, [topic]: JSON.parse(message.toString()) }))
    );

    client.subscribe(EMQTTEvent.RAISE_HAND + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subcribed to ${EMQTTEvent.RAISE_HAND + roomId}`);
    });

    return () => {
      client.end();
    };
  }, []);

  return payload;
};
