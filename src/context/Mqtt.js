import React, { useEffect, useMemo, useState } from "react";
import { connect } from "mqtt";
import { MQTT_URI } from "../utils/constants";

export const MqttContext = React.createContext();

export const MqttProvider = ({ children }) => {
  const client = useMemo(
    () =>
      connect(MQTT_URI, {
        protocol: "ws",
        clientId: "mqtt_" + Math.random().toString(16).substring(2, 8),
      }),
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.on("connect", () => {
      setLoading(() => false);
      console.log("Connected to Class");
    });

    client.on("error", (err) => {
      setLoading(() => false);
      console.log(err.message);
    });

    return () => client.end();
  }, []);

  if (loading) return <React.Fragment />;

  return (
    <MqttContext.Provider value={{ client }}>{children}</MqttContext.Provider>
  );
};
