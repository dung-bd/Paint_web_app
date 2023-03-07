import { URL, HEADER } from "./constants";

// GET
export const getRooms = () =>
  fetch(`${URL}/room`, {
    method: "GET",
    headers: HEADER,
  }).then((res) => res.json());
export const getRoom = (roomId) => fetch(`${URL}/room/${roomId}`, {
  method: "GET",
  headers: HEADER,
}).then((res) => res.json());

// POST
export const createRoom = (payload) =>
  fetch(`${URL}/room`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
export const joinRoom = (roomId) =>
  fetch(`${URL}/room/join/${roomId}`, {
    method: "POST",
    headers: HEADER,
  }).then((res) => res.json());
export const draw = (roomId, payload) =>
  fetch(`${URL}/room/draw/${roomId}`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
// export const kickout = (payload) => axios.post("kick", payload);
// export const raiseHand = (payload) => axios.post("raise-hand", payload);
// export const acceptHand = (payload) => axios.post("pick", payload);

// // PUT
// export const updateRoom = (roomId, payload) => axios.put(`room/${roomId}`, payload);    // ko có body để update room?

// DELETE
export const deleteRoom = (roomId) =>
  fetch(`${URL}/room/${roomId}`, {
    method: "DELETE",
    headers: HEADER,
  }).then((res) => res.json());
