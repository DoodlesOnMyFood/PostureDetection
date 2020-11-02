import { sum } from "@tensorflow/tfjs";

const detect = async (webcamRef, net) => {
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
      return net.estimateSinglePose(video);
      

      //drawCanvas(pose, video, videoWidth, videoHeight, canvasRef).catch((err) => console.log(err)) // error happens sometimes. Not critical so just catch and drop.
    }
}

export {detect}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export {sleep}

export function checkPose(pose){
  let head = []
  const accuracyCut = 0.6
  let i
  for(i = 0; i <= 4; ++i){
    if(pose.keypoints[i].score < accuracyCut){
      return {error : "Can't see person"}
    }
    head.push(pose.keypoints[i].position.y)
  }
  const head_sum = (head.reduce((a,b) => {return a+b}, 0) / 5)

  if(pose.keypoints[5].score < accuracyCut || pose.keypoints[6].score < accuracyCut){
    return {error : "Can't see shoulders"}
  }

  return {error : "", head : head_sum, shoulders : (pose.keypoints[5].position.y + pose.keypoints[6].position.y) /2}
}