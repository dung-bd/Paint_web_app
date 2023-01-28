
import React, { useContext } from 'react';
import RoomForm from './RoomForm';
import RoomsContext from '../context/RoomsContext';
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({ history }) => {
  const { rooms, setRooms } = useContext(RoomsContext);
  const navigate = useNavigate();

  const handleOnSubmit = (room) => {
    setRooms([room, ...rooms]);
    navigate('/');
  };

  return (
    <React.Fragment>
      <RoomForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default CreateRoom;