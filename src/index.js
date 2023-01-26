import React from "react";
import ReactDOM from "react-dom";
import DrawArea from "./components/DrawArea/DrawArea";
import DrawControls from "./components/DrawControls/DrawControls";

import "./styles.css";

class App extends React.Component {
  state = {
    canvasWidth: 0,
    canvasHeight: 0,
    lineColor: "rgba(144, 145, 154, 1)",
    lineWidth: 4
  };

  componentDidMount() {
    this.setDimensions();
  }

  setDimensions = () => {
    this.setState(
      {
        canvasWidth: window.innerWidth / 1.2,
        canvasHeight: window.innerHeight / 1.4
      },
      () => {
        const canvas = document.getElementById("draw-canvas");
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = this.state.lineColor;
        ctx.lineWidth = this.state.lineWidth;
      }
    );
  };

  changeLineColor = color => {
    this.setState({
      lineColor: `rgba(
        ${color.rgb.r},
        ${color.rgb.g},
        ${color.rgb.b},
        ${color.rgb.a})`
    });
  };

  changeLineWidth = event => {
    this.setState({
      lineWidth: event.target.value
    });
  };

  render() {
    const { canvasWidth, canvasHeight, lineColor, lineWidth } = this.state;
    return (
      <div className="App">
        <div className="App-content" style={{ width: canvasWidth }}>
          <DrawArea
            width={canvasWidth}
            height={canvasHeight}
            lineColor={lineColor}
            lineWidth={lineWidth}
            onResize={this.setDimensions}
          />
          <DrawControls
            color={lineColor}
            lineWidth={lineWidth}
            onColorChange={this.changeLineColor}
            onLineWidthChange={this.changeLineWidth}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
