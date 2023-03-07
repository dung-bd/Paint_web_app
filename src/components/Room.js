import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Room.css";

const Room = ({
  _id,
  name,
  limit,
  participant,
  status,
  handleJoinRoom,
  handleRemoveRoom,
}) => {
  return (
    <Card style={{ width: "18rem" }} className="room">
      <Card.Body>
        <Card.Title className="room-title">{name}</Card.Title>
        <div className="room-details">
          {/* <div>Status: {status}</div> */}
          <div>Current: {participant.length}</div>
          <div>Limit: {limit}</div>
        </div>
        <Button variant="primary" onClick={() => handleJoinRoom(_id)}>
          Join
        </Button>{" "}
        <Button variant="danger" onClick={() => handleRemoveRoom(_id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Room;
