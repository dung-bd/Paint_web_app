import { axios1 } from "./axios";

// GET
export const getRooms = () => axios1.get("room");
export const getRoomInfo = (roomId) => axios1.get(`room/${roomId}`);

// POST
export const createRoom = (payload) => axios1.post("room", payload);
export const joinRoom = (payload) => axios1.post("join", payload);
export const kickout = (payload) => axios1.post("kick", payload);
export const raiseHand = (payload) => axios1.post("raise-hand", payload);
export const acceptHand = (payload) => axios1.post("pick", payload);

// PUT
export const updateRoom = (roomId, payload) => axios1.put(`room/${roomId}`, payload);    // ko có body để update room?

// DELETE
export const deleteRoom = (roomId) => axios1.delete("room");     // ko cần roomId?
