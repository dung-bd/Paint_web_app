import { URL } from "./constants";

const option = (method, payload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };
  }

  let key = user.auth.token;
  if (parseInt(user.auth.expire_in) <= Date.now() / 1000 + 10) {
    key = null;
    localStorage.removeItem("user");
  }

  if (!key) {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };
  }

  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  };
};

/* ----- GET ----- */
export const getRooms = () =>
  fetch(`${URL}/room`, option("GET")).then((res) => res.json());

export const getRoom = (roomId) =>
  fetch(`${URL}/room/${roomId}`, option("GET")).then((res) => res.json());

/* ----- POST ----- */
export const createRoom = (payload) =>
  fetch(`${URL}/room`, option("POST", payload)).then((res) => res.json());

export const joinRoom = (roomId) =>
  fetch(`${URL}/room/join/${roomId}`, option("POST")).then((res) => res.json());

export const drawCanvas = (roomId, payload) =>
  fetch(`${URL}/room/draw/${roomId}`, option("POST", payload)).then((res) =>
    res.json()
  );

export const login = (payload) =>
  fetch(`${URL}/participant/login`, option("POST", payload)).then((res) =>
    res.json()
  );

export const register = (payload) =>
  fetch(`${URL}/participant/signup`, option("POST", payload)).then((res) =>
    res.json()
  );
// export const kickout = (payload) => axios.post("kick", payload);
export const kickUser = (roomId, userId) =>
  fetch(`${URL}/room/kick/${roomId}`, option("POST", { userId })).then((res) =>
    res.json()
  );

export const allowUserWrite = (roomId, userId) =>
  fetch(`${URL}/room/allow-write/${roomId}`, option("POST", { userId })).then(
    (res) => res.json()
  );

// export const acceptHand = (payload) => axios.post("pick", payload);
export const clearBoardApi = (roomId) =>
  fetch(`${URL}/room/clear/${roomId}`, option("POST")).then((res) => res.json());
/* ----- PUT ----- */
// export const updateRoom = (roomId, payload) => axios.put(`room/${roomId}`, payload);    // ko c?? body ????? update room?

/* ----- DELETE ----- */
export const deleteRoom = (roomId) =>
  fetch(`${URL}/room/${roomId}`, option("DELETE")).then((res) => res.json());
