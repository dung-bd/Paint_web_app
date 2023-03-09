import React, { useState } from "react";
import "./DrawControls.css";
import { ChromePicker } from "react-color";
import { clearBoardApi } from "../../utils/request";
import { toast } from "react-hot-toast";

const DrawControls = props => {
  const popover = {
    position: "absolute",
    bottom: "20px",
    zIndex: "1"
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  };

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const clearCanvas = async () => {
    // 

    
    const res=await clearBoardApi(props.roomId)
    if(res.success===true){
      // const canvas = document.getElementById("draw-canvas");
      // const ctx = canvas.getContext("2d");
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    }else{
      toast("not allowed")
    }
  };

  return (
    <section className="draw-controls" style={{ background: "#E9E6E1" }}>
      <div>
        <div className="draw-controls-content-container">
          <button className="btn btn-primary" onClick={handleClick}>
            Pick Color
          </button>
          {displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={handleClose} />
              <ChromePicker
                color={props.color}
                onChangeComplete={props.onColorChange}
              />
            </div>
          ) : null}

          <form className="draw-controls-brush-form">
            <label
              htmlFor="formControlRange"
              className="draw-controls__label"
              style={{ marginRight: "10px" }}
            >
              Brush size
            </label>
            <input
              type="range"
              id="formControlRange"
              min="1"
              max="15"
              value={props.lineWidth}
              onChange={props.onLineWidthChange}
            />
          </form>
        </div>
      </div>

      <div>
        <button className="btn btn-primary" onClick={clearCanvas}>
          Clear canvas
        </button>
      </div>
    </section>
  );
};

export default DrawControls;
