import { connect } from "mqtt";
import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../context/Client";
import { EMQTTEvent } from "../utils/constants";

export const useMqtt = (roomId) => {
  const { client } = useContext(ClientContext);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    client.subscribe(EMQTTEvent.DRAW + roomId, (err) => {
      if (err) console.error(err);
      else console.log(`Subscribed to ${EMQTTEvent.DRAW + roomId}`);
    });

    client.on("message", (topic, message) =>
      setPayload((val) => ({ ...val, [topic]: JSON.parse(message.toString()) }))
    );

    return () => {
      client.end();
    };
  }, []);

  return payload;
};
