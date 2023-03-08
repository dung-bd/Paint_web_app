import React, { useEffect, useState } from "react";
import _ from "lodash";
import Room from "./Room";
import "./RoomsList.css";
import { deleteRoom, getRooms, joinRoom } from "../utils/request";
import { useNavigate } from "react-router-dom";

const RoomsList = () => {
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getRooms();
      console.log(data);
      setRoom(() => data);
    }
    fetchData();
  }, []);

  const handleRemoveRoom = async (id) => {
    await deleteRoom(id);
    setRoom(room.filter((item) => item._id !== id));
  };

  const handleJoinRoom = async (id) => {
    const res = await joinRoom(id);
    console.log(res);
    navigate(`/room/${id}`);
  };

  return (
    <React.Fragment>
      <div className="room-list">
        {!_.isEmpty(room) ? (
          room.map((item) => (
            <Room
              key={item._id}
              {...item}
              handleJoinRoom={handleJoinRoom}
              handleRemoveRoom={handleRemoveRoom}
            />
          ))
        ) : (
          <p className="message">
            No rooms available. Please create some rooms.
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default RoomsList;
