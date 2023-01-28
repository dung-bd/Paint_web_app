import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';

const RoomForm = (props) =>{
    const [room, setRoom] = useState(()=>{
        return{
        roomname: props.room ? props.room.roomname : "",
        roomAuthor: props.room ? props.room : "",
        time: props.room ? props.room.date : ""
        }
    });

    const [errorMsg, setErrorMsg] = useState('');
    const {roomname, roomAuthor, time} = room;
    
    const handleOnSubmit = (event) =>{
        event.preventDefault();
        const values = [roomname, roomAuthor, time];
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !=='0';
        });

        if(!allFieldsFilled){
              const room = {
                id: uuidv4(),
                roomname,
                roomAuthor,
                time: new Date()
              };
              props.handleOnSubmit(room);
        }else{
            errorMsg = 'Please fill out all the fields'
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        switch(name){
            case 'quantity':
                if(value === '' || parseInt(value) ===  +value){
                    setRoom((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            default:
                setRoom((prevState) => ({
                    ...prevState,
                    [name]: value
                }));    
        }
    };

    return(
        <div className="main-form">
           {errorMsg && <p className="errorMsg">{errorMsg}</p>}
           <Form onSubmit={handleOnSubmit}>
             <Form.Group controlId="name">
                <Form.Label>Room Name</Form.Label>
                <Form.Control 
                className="input-control"
                type="text"
                name="roomname"
                value={roomname}
                placeholder="Enter name of room"
                onChange={handleInputChange}
                />
             </Form.Group>
             <Form.Group controlId="author">
                <Form.Label>Room Author</Form.Label>
                <Form.Control 
                className="input-control"
                type="text"
                name="roomAuthor"
                value={roomAuthor}
                placeholder="Enter name of author"
                onChange={handleInputChange}
                />
             </Form.Group>
             <Button variant="primary" type="submit" className="submit-btn">
                Submit
             </Button>

           </Form>
        </div>
    );
};

export default RoomForm;