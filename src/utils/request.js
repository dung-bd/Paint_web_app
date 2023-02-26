import { axios } from "./axios";

// GET
export const getRooms = () => axios.get("room");
export const getRoomInfo = (roomId) => axios.get(`room/${roomId}`);

// POST
export const createRoom = (payload) => axios.post("room", payload);
export const joinRoom = (payload) => axios.post("join", payload);
export const kickout = (payload) => axios.post("kick", payload);
export const raiseHand = (payload) => axios.post("raise-hand", payload);
export const acceptHand = (payload) => axios.post("pick", payload);

// PUT
export const updateRoom = (roomId, payload) => axios.put(`room/${roomId}`, payload);    // ko có body để update room?

// DELETE
export const deleteRoom = (roomId) => axios.delete("room");     // ko cần roomId?
