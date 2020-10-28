import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet"; //포즈 인식 모델
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

function PoseDetect( { setPoseDetect } ) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
        architechture:'MobileNetV1', 
      inputResolution: { width: 320, height: 240 },
      multiplier: 0.5,
    });
    //0.5초마다 반복함
    setInterval(() => {
      detect(net);
    }, 500);
  };

  const detect = async (net) => {
    if (//카메라 상태 체크
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // 이걸 왜하나 싶지만, 안하면 버그 난다고 합니다.
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef).catch((err) => console.log(err)) // error happens sometimes. Not critical so just catch and drop.
    }
  };

  const drawCanvas = async (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx); //그리기
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  runPosenet();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,//640,480
            height: 240,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,
            height: 240,
          }}
        />
        <button style={{position: "absolute",bottom:"30%"}} onClick={()=>setPoseDetect(false)}>close</button>
      </header> 
    </div>
  );
}

export default PoseDetect;
