import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Room.css"

const Room = ({
  id,
  roomname,
  roomAuthor,
  time,
  handleRemoveRoom
}) => {
  const history = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="room">
      <Card.Body>
        <Card.Title className="room-title">{roomname}</Card.Title>
        <div className="room-details">
          <div>Author: {roomAuthor}</div>
          <div>Date: {new Date(time).toDateString()}</div>
        </div>
        <Button variant="primary" onClick={() => history(`/room/${id}`)}>
          Enjoy
        </Button>{' '}
        <Button variant="danger" onClick={() => handleRemoveRoom(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Room;