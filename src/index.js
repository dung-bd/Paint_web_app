import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import DrawArea from "./components/DrawArea/DrawArea";
import DrawControls from "./components/DrawControls/DrawControls";
import Header from "./components/HomePage/Header";
import Kick from "./components/Kick";
import AppRouter from "./components/router/AppRouter";
import { draw, getRoom } from "./utils/request";
import { useMqtt } from "./hook/useMqtt";
import addNotification from 'react-push-notification';
import toast, { Toaster } from 'react-hot-toast'

import "./styles.css";
import { EMQTTEvent } from "./utils/constants";

const App = () => {
  const [roomInfo, setRoomInfo] = useState();
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [lineColor, setLineColor] = useState("rgba(144, 145, 154, 1)");
  const [lineWidth, setLineWidth] = useState(4);
  const [payload, setPayload] = useState([]);

  const { id } = useParams();

  const mqttValue = useMqtt(id);

  // mqtt
  // useSubscribe(id);

  useEffect(() => {
    setDimensions();
    getRoomInfo();
  }, []);

  // Send
  useEffect(() => {
    if (payload.length === 100) {
      draw(id, { line: payload });
      setPayload(() => []);
    }
  }, [payload]);

  // Receive
  useEffect(() => {
    if (mqttValue) console.log(mqttValue);
  }, [mqttValue]);

  const setDimensions = () => {
    setCanvasWidth(window.innerWidth / 1.2);
    setCanvasHeight(window.innerHeight / 1.4);
  };

  const getRoomInfo = async () => {
    const res = await getRoom(id);
    setRoomInfo(() => res);
  };

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

 const notify = () => {toast.success('Raise')};

  return (
    <div className="App">
      <Header />
      <div className="App-content" style={{ width: canvasWidth }}>
        <DrawArea
          width={canvasWidth}
          height={canvasHeight}
          lineColor={lineColor}
          lineWidth={lineWidth}
          mqttValue={
            mqttValue[EMQTTEvent.DRAW + id]
              ? mqttValue[EMQTTEvent.DRAW + id].data.line
              : undefined
          }
          setPayload={setPayload}
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
        <button type="submit" onClick={notify} mqttValue={mqttValue[EMQTTEvent.RAISE_HAND + id] ? mqttValue[EMQTTEvent.RAISE_HAND + id].data.line : undefined}>
      Raise
    </button>
     <Toaster position="top-right"
  reverseOrder={false}/>
    </div>
      {/* <Kick /> */}
    </div>
  );
};

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
