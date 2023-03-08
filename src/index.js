import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import DrawArea from "./components/DrawArea/DrawArea";
import DrawControls from "./components/DrawControls/DrawControls";
import Kick from "./components/Kick";
import AppRouter from "./components/router/AppRouter";
import { getRoom } from "./utils/request";
import { useMqtt } from "./hook/useMqtt";
import toast, { Toaster } from "react-hot-toast";

import "./styles.css";
import { EMQTTEvent } from "./utils/constants";
import { UserContext } from "./context/User";

const App = () => {
  // const [roomInfo, setRoomInfo] = useState();
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [lineColor, setLineColor] = useState("rgba(144, 145, 154, 1)");
  const [lineWidth, setLineWidth] = useState(4);

  const { id } = useParams();

  const { userInfo } = useContext(UserContext);

  const mqttValue = useMqtt(id);

  useEffect(() => {
    setDimensions();
    console.log(userInfo);
    // getRoomInfo();
  }, []);

  // Receive
  // useEffect(() => {
  //   if (mqttValue) console.log(mqttValue);
  // }, [mqttValue]);

  const setDimensions = () => {
    setCanvasWidth(window.innerWidth / 1.2);
    setCanvasHeight(window.innerHeight / 1.4);
  };

  // const getRoomInfo = async () => {
  //   const res = await getRoom(id);
  //   setRoomInfo(() => res);
  // };

  useEffect(() => {
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
  }, [lineColor, lineWidth]);

  const changeLineColor = (color) => {
    setLineColor(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    );
  };

  const changeLineWidth = (event) => {
    setLineWidth(event.target.value);
  };

  const notify = () => {
    toast.success("Raise");
  };

  return (
    <div className="App">
      <div className="App-content" style={{ width: canvasWidth }}>
        <DrawArea
          width={canvasWidth}
          height={canvasHeight}
          lineColor={lineColor}
          lineWidth={lineWidth}
          // mqttValue={
          //   mqttValue[EMQTTEvent.DRAW + id]
          //     ? mqttValue[EMQTTEvent.DRAW + id]
          //     : undefined
          // }
          mqttValue={mqttValue}
          roomId={id}
          userId={userInfo._id}
          onResize={setDimensions}
        />
        <DrawControls
          color={lineColor}
          lineWidth={lineWidth}
          onColorChange={changeLineColor}
          onLineWidthChange={changeLineWidth}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={notify}
          // mqttValue={
          //   mqttValue[EMQTTEvent.RAISE_HAND + id]
          //     ? mqttValue[EMQTTEvent.RAISE_HAND + id].data.line
          //     : undefined
          // }
        >
          Raise
        </button>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* <Kick /> */}
    </div>
  );
};

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
