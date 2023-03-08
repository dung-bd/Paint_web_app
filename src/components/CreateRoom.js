import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { createRoom } from "../utils/request";

const CreateRoom = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!name || !limit) {
      setErrorMsg("Please fill out all the fields");
    } else {
      const { data } = await createRoom({ name, limit });
      navigate(`/room/${data._id}`);
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Room name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="room"
            value={name}
            placeholder="Enter room name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="limit">
          <Form.Label>Student cap</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="limit"
            value={limit}
            placeholder="Enter maximum number of student"
            onChange={(e) => setLimit(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateRoom;
