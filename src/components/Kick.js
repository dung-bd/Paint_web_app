import React, {useState} from 'react';
import { Button, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Room.css"
import Room from './Room';
import { kickout } from '../utils/request';

const Kick = ({
  id,
  username,
  roomId
}) => {
  const history = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputValue); 
    setInputValue('');
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange1(event) {
    setInputValue1(event.target.value);
  }

  function handleChange2(event) {
    setInputValue2(event.target.value);
  }

  function handleClick(){
     kickout();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter UserId" />
      <input type="text" value={inputValue1} onChange={handleChange1} placeholder="Enter username" />
      <input type="text" value={inputValue2} onChange={handleChange2} placeholder="Enter RoomId" />
      <button type="submit" onClick={handleClick}>Kick</button>
    </form>
  );
};

export default Kick;