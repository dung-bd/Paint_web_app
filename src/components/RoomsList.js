import React, { useContext } from "react"
import _ from 'lodash'
import Room from './Room'
import RoomsContext from "../context/RoomsContext"
import "./RoomsList.css"

const RoomsList = () =>{
    const {rooms, setRooms} = useContext(RoomsContext);

    const handleRemoveRoom =(id) =>{
        setRooms(rooms.filter((room) => room.id !== id));
    };

    return(
        <React.Fragment>
            <div className="room-list">
                {!_.isEmpty(rooms) ? (
                    rooms.map((room)=>(
                        <Room key={room.id} {...room} handleRemoveRoom={handleRemoveRoom} />
                    ))
                ) : (
                    <p className="message">No rooms available. Please create some rooms.</p>
                )}
            </div>
        </React.Fragment>
    )
}

export default RoomsList;