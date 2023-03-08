import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../HomePage/Header";
import CreateRoom from "../CreateRoom";
import RoomsList from "../RoomsList";
import { ClientProvider } from "../../context/Client";
import App from "../..";
import Login from "../Login/Login";
import Register from "../SignUp/SignUp";
const AppRouter = () =>{
   // const [rooms, setRooms] = useLocalStorage('rooms', []);
    return(
        <BrowserRouter>
        <div>
            <div className="main-content">
                <ClientProvider>
               <Routes>
                <Route element={<Login />} path="/" exact={true} />
                <Route element={<Login />} path="/login" exact={true} />
                <Route element={<Register />} path="/register" exact={true} />
                <Route element={<RoomsList />} path="/list" exact={true} />
                <Route element={<CreateRoom/>} path="/add" exact={true} />
                <Route element={<App/>} path="/room/:id" />
               </Routes>
               </ClientProvider>
            </div>
        </div>
    </BrowserRouter>
  );
};

export default AppRouter;
