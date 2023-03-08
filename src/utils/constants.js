// export const URL = "https://8f9d-118-70-190-141.ap.ngrok.io";
export const URL = "http://localhost:9393";
export const MQTT_URI = "ws://broker.hivemq.com:8000/mqtt";
// export const BEARER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y3NDk5N2FmYTM2ZTFmZjVjZjQ2NTciLCJuYW1lIjoidGFuMSIsInBhc3N3b3JkIjoidGVzdCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc4MTAwNjQ0LCJleHAiOjE2NzgxODcwNDR9.epHxBUkce-lB_8jOnEzyu32Ghdm5LehtiQKix51I-DI";
// export const HEADER = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${BEARER}`,
// };

const PREFIX = "iot-be-hust/";
export const EMQTTEvent = {
  CREATE_ROOM: PREFIX + "create_room",
  UPDATE_ROOM: PREFIX + "update_room",
  DELETE_ROOM: PREFIX + "delete_room",

  DRAW: PREFIX + "room/draw/", // users

  JOIN_ROOM: PREFIX + "participant/join/",
  EXIT_ROOM: PREFIX + "participant/exit/",

  RAISE_HAND: PREFIX + "parcitipant/raise_hand/",
  KICK: PREFIX + "participant/kick/",
};
