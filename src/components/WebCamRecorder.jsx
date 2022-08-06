import React, {useEffect, useRef, useState}from "react";
import Webcam from "react-webcam";
import { doc, setDoc } from "firebase/firestore";
import "../components/styles/WebCamRecorder.css"
import db from "../firebase/firebaseConfig";

function WebCamRecorder(){
  let videoRef=useRef(null)
  let photoRef=useRef(null)
  const getUserCamera=()=>{ //with this function we get the user camera with video and sound
    navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })
    .then((stream)=>{
      let video=videoRef.current
      video.srcObject=stream //we set out src video to our stream
      video.play()  //we get our video stream and play it 
    })
    .catch((error)=>{ //if and error happend we show it 
      console.log(error)
    })
  }
  const pic=()=>{ //with this function we create a frame
    let width=500
    let height=width/(16/9) //we divide it to get 16/9 perspective
    let photo=photoRef.current 
    let video=videoRef.current 
    photo.width=width
    photo.height=height
    let ctx=photo.getContext('2d') //we declare a context
    ctx.drawImage(video,0,0,photo.width,photo.height) //we draw our video
    console.log(video)
    
    const canvas = document.getElementById('canvas'); //we get our canvas
    const dataURL = canvas.toDataURL(); // we convert our canvas to a blob object
    console.log(dataURL); //we show it at console
    const upload=async()=>{ //in this functions we upload our blob element to firebase
      await setDoc(doc(db, "video", "stream"), { //we need doc and inside it we pass our db conecction and our references
        state: "on",
        src:dataURL //we pass our blob element as text
      });
    }
    upload() //we execute our upload function
  }
  useEffect(()=>{ //whit this useEffect we run the getUserCamera and hide our Go Live button
    getUserCamera()
    document.querySelector(".GoLive").style.display="none"
  },[videoRef])


  var intervalID;
  function start(){ //whith this function we start our stream
    
    document.getElementById("btnLive").style.display="none" //we hide our start button
    document.getElementById("btnLiveStop").style.display="block" //we show our stop button
    intervalID = setInterval(pic, 1000);  // we create an interval, to execute the pic function after x ms
}

// Function to stop setInterval call
function stop(){
    clearInterval(intervalID);
    document.getElementById("btnLive").style.display="block"
    document.getElementById("btnLiveStop").style.display="none"
}
  return( //we render our component
    <div>
      
      <video ref={videoRef} muted></video> {/*We render our video element an pass it our video reference*/}
      <br />
      <button id="btnLive" onClick={start}>Stream</button> {/*When we click this button it executes the start function*/}
      <button id="btnLiveStop" onClick={stop}>Stop</button> {/*When we click this button it executes the stop function*/}
      <canvas id="canvas" ref={photoRef} style={{
        // we create a canvas with the photo reference and we hide it 
        display:"none"
      }}></canvas>
    </div>
  )
} 
export default WebCamRecorder //we export the WebCamRecorder component