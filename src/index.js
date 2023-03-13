import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import DrawArea from "./components/DrawArea/DrawArea";
import DrawControls from "./components/DrawControls/DrawControls";
import AppRouter from "./components/router/AppRouter";
import UserList from "./components/UserList/index";

import { UserContext } from "./context/User";
import { getRoom } from "./utils/request";
import { useMqtt } from "./hook/useMqtt";

import "./styles.css";

const RoomInfo = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getRoomInfo();
  }, []);

  const getRoomInfo = async () => {
    const { data } = await getRoom(id);
    // setAllowDraw((val) => [...val, data.admin]);
    setRoomInfo(() => ({ ...data }));
  };

  if (!roomInfo._id) return <React.Fragment />;

  return <App id={id} roomInfo={roomInfo} />;
};

const App = ({ roomInfo, id }) => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [lineColor, setLineColor] = useState("rgba(144, 145, 154, 1)");
  const [lineWidth, setLineWidth] = useState(4);

  const { userInfo } = useContext(UserContext);

  const { draw, choosen } = useMqtt(id, roomInfo.admin, userInfo._id);

  useEffect(() => {
    setDimensions();
  }, []);

  const setDimensions = () => {
    setCanvasWidth(window.innerWidth / 1.2);
    setCanvasHeight(window.innerHeight / 1.4);
  };

  useEffect(() => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
  }, [lineColor, lineWidth]);

  const changeLineColor = (color) => {
    setLineColor(
      () =>
        `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    );
  };

  const changeLineWidth = (event) => {
    setLineWidth(() => event.target.value);
  };

  return (
    <div className="App">
      <div className="App-content" style={{ width: canvasWidth }}>
        <DrawArea
          width={canvasWidth}
          height={canvasHeight}
          lineColor={lineColor}
          lineWidth={lineWidth}
          draw={draw}
          choosen={choosen || roomInfo.admin === userInfo._id}
          // allowDraw={allowDraw}
          // setAllowDraw={setAllowDraw}
          roomId={id}
          userId={userInfo._id}
          onResize={setDimensions}
        />
        <DrawControls
          roomId={id}
          color={lineColor}
          lineWidth={lineWidth}
          onColorChange={changeLineColor}
          onLineWidthChange={changeLineWidth}
        />
      </div>
      <UserList
        roomId={id}
        admin={roomInfo.admin}
        user={userInfo._id}
        currentWriter={roomInfo.currentWriter}
      />
    </div>
  );
};

export default RoomInfo;

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
