import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public
import Header from "../HomePage/Header";
import Login from "../Login/Login";
import Register from "../SignUp/SignUp";

// Private
import RoomsList from "../RoomsList";
import CreateRoom from "../CreateRoom";

import { MqttProvider } from "../../context/Mqtt";
import { UserContext, UserProvider } from "../../context/User";
import App from "../..";

import "./AppRouter.css";

const PrivateRoute = () => {
  const { isLogin } = useContext(UserContext);

  return isLogin ? (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="main-content">
        <Toaster position="top-right" reverseOrder={false} />
        <UserProvider>
          <MqttProvider>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<RoomsList />} />
                <Route exact path="/add" element={<CreateRoom />} />
                <Route exact path="/room/:id" element={<App />} />
              </Route>
            </Routes>
          </MqttProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
