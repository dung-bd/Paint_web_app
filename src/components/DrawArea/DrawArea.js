import React from "react";
import "./DrawArea.css";
import { fromEvent, Subject } from "rxjs";
import { mergeMap, takeUntil, tap } from "rxjs/operators";
import Brush from "../Brush";
import RaiseHandButton from "../RaiseHandButton";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import toast, { Toaster } from 'react-hot-toast'
//import { ToastContainer, toast } from 'react-toastify';
 // import 'react-toastify/dist/ReactToastify.css';
 import { raiseHand } from "../../utils/request";

class DrawArea extends React.Component {
  state = {
    currX: 0,
    currY: 0,
    brushHidden: true
  };

  destroy$ = new Subject();

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.initDraw();
  }

  componentDidUpdate(prevProps) {
    this.context = this.canvasRef.current.getContext("2d");
    if (this.props.lineColor !== prevProps.lineColor) {
      this.context.strokeStyle = this.props.lineColor;
    }
    if (this.props.lineWidth !== prevProps.lineWidth) {
      this.context.lineWidth = this.props.lineWidth;
    }
  }

  componentWillUnmount() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  initDraw() {
    this.canvasEl = this.canvasRef.current;
    this.context = this.canvasEl.getContext("2d");

    const mouseDown$ = fromEvent(this.canvasEl, "mousedown");
    const mouseUp$ = fromEvent(document, "mouseup");
    const mouseMove$ = fromEvent(document, "mousemove");
    const mouseClick$ = fromEvent(this.canvasEl, "click");
    const mouseDrag$ = mouseDown$.pipe(
      tap((e) => {
        this.currX = e.clientX - this.canvasEl.offsetLeft;
        this.currY = e.clientY - this.canvasEl.offsetTop;
      }),
      mergeMap(() => mouseMove$.pipe(takeUntil(mouseUp$)))
    );

    const touchMove$ = fromEvent(document, "touchmove");

    /* mouseClick$.pipe(takeUntil(this.destroy$)).subscribe(e => {
      const ctx = this.context;
      this.setCoords(e);
      ctx.fillRect(
        this.currX,
        this.currY,
        this.props.lineWidth,
        this.props.lineWidth
      );
    }); */

    mouseMove$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.setState({
        currX: e.clientX,
        currY: e.clientY
      });
    });

    mouseDrag$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.setCoords(e);
      this.draw();
    });

    touchMove$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.setCoords(e.changedTouches[0]);
      this.draw();
    });

    fromEvent(window, "resize")
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.reDrawImage();
        this.props.onResize();
      });
  }

  reDrawImage() {
    const ctx = this.context;
    const strDataURI = this.canvasEl.toDataURL();
    const img = new Image();
    console.log(1);
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = strDataURI;
  }

  setCoords(e) {
    this.prevX = this.currX;
    this.prevY = this.currY;
    this.currX = e.clientX - this.canvasEl.offsetLeft;
    this.currY = e.clientY - this.canvasEl.offsetTop;
  }

  draw() {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.currX, this.currY);
    ctx.stroke();
    ctx.closePath();
    console.log("here");
  }

  handleMouseOut = () => {
    this.setState({
      brushHidden: true
    });
  };

  handleMouseIn = () => {
    this.setState({
      brushHidden: false
    });
  };

  raiseNotification = () =>{
    addNotification({
      title: 'Raised',
      subtitle: 'Raised',
      message: 'Raised',
      theme: 'light',
      closeButton:"X",
      backgroundTop:"green",
      backgroundBottom:"yellowgreen"
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.raiseNotification();
  }

  notify = () => {toast.success('Raise');
raiseHand();
}

  render() {
    return (
      <div>
        <canvas
          width={this.props.width}
          height={this.props.height}
          className="draw-canvas"
          id="draw-canvas"
          ref={this.canvasRef}
          onMouseOver={this.handleMouseIn}
          onMouseOut={this.handleMouseOut}
          onMouseEnter={this.handleMouseIn}
        />
        <Brush
          mouseX={this.state.currX}
          mouseY={this.state.currY}
          radius={this.props.lineWidth}
          color={this.props.lineColor}
          className={
            this.state.brushHidden ? "draw-canvas-brush--hidden" : undefined
          }
        />
        <div>
        <button type="submit" onClick={this.notify}>
      Raise
    </button>
     <Toaster position="top-right"
  reverseOrder={false}/>
    </div>
      </div>
    );
  }
}

export default DrawArea;
