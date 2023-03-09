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

const App = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [lineColor, setLineColor] = useState("rgba(144, 145, 154, 1)");
  const [lineWidth, setLineWidth] = useState(4);
  const [allowDraw, setAllowDraw] = useState([]);

  const { id } = useParams();

  const { userInfo } = useContext(UserContext);

  const mqttValue = useMqtt(id);

  useEffect(() => {
    setDimensions();
    getRoomInfo();
  }, []);

  const setDimensions = () => {
    setCanvasWidth(window.innerWidth / 1.2);
    setCanvasHeight(window.innerHeight / 1.4);
  };

  const getRoomInfo = async () => {
    const { data } = await getRoom(id);
    setAllowDraw((val) => [...val, data.admin]);
    setRoomInfo(() => ({ ...data }));
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
          mqttValue={mqttValue}
          allowDraw={allowDraw}
          setAllowDraw={setAllowDraw}
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
      <UserList roomId={id} isAdmin={roomInfo.admin === userInfo._id} currentWriter={roomInfo.currentWriter} />
    </div>
  );
};

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
