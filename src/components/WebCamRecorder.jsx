import React, {useEffect, useRef, useState}from "react";
import Webcam from "react-webcam";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

function WebCamRecorder(){
  let videoRef=useRef(null)
  let photoRef=useRef(null)
  const getUserCamera=()=>{
    navigator.mediaDevices.getUserMedia({
      video:true
    })
    .then((stream)=>{
      let video=videoRef.current
      video.srcObject=stream
      video.play()
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const pic=()=>{
    let width=500
    let height=width/(16/9)
    let photo=photoRef.current
    let video=videoRef.current
    photo.width=width
    photo.height=height
    let ctx=photo.getContext('2d')
    ctx.drawImage(video,0,0,photo.width,photo.height)
    console.log(video)
    
    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    const upload=async()=>{
      await setDoc(doc(db, "video", "stream"), {
        state: "on",
        src:dataURL
      });
    }
    upload()
  }
  useEffect(()=>{
    getUserCamera()
    document.querySelector(".GoLive").style.display="none"
    // console.log(videoRef.current)
    // console.log(videoRef)

  },[videoRef])


  var intervalID;
  function start(){
    
    document.getElementById("btnLive").style.display="none"
    document.getElementById("btnLiveStop").style.display="block"
    intervalID = setInterval(pic, 1000);
}

// Function to stop setInterval call
function stop(){
    clearInterval(intervalID);
    document.getElementById("btnLive").style.display="block"
    document.getElementById("btnLiveStop").style.display="none"
}
  return(
    <div>
      {/* <h1>Camara activada</h1> */}
      <video ref={videoRef}></video>
      <br />
      <button id="btnLive" onClick={start}>Stream</button>
      <button id="btnLiveStop" onClick={stop}>Stop</button>
      <canvas id="canvas" ref={photoRef} style={{
        display:"none"
      }}></canvas>
    </div>
  )
} 
export default WebCamRecorder