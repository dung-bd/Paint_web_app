import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Header from "../HomePage/Header";
import CreateRoom from "../CreateRoom";
import RoomsList from "../RoomsList";
import useLocalStorage from "../../hooks/useLocalStorage";
import RoomsContext from "../../context/RoomsContext";
import App from "../..";

const AppRouter = () =>{
    const [rooms, setRooms] = useLocalStorage('rooms', []);
    return(
        <BrowserRouter>
        <div>
            <Header />
            <div className="main-content">
                <RoomsContext.Provider value={{rooms, setRooms}}>
               <Routes>
                <Route element={<RoomsList />} path="/" exact={true} />
                <Route element={<CreateRoom/>} path="/add" exact={true} loader={(props) => (<CreateRoom {...props} rooms={rooms} setRooms={setRooms} />)}/>
                <Route element={<App/>} path="/room/:id" />
               </Routes>
               </RoomsContext.Provider>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default AppRouter;