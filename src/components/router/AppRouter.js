import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../HomePage/Header";
import CreateRoom from "../CreateRoom";
import RoomsList from "../RoomsList";
import { ClientProvider } from "../../context/Client";
import App from "../..";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <ClientProvider>
            <Routes>
              <Route element={<RoomsList />} path="/" exact={true} />
              <Route element={<CreateRoom />} path="/add" exact={true} />
              <Route element={<App />} path="/room/:id" />
            </Routes>
          </ClientProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
