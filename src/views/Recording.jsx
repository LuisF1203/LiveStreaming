import React,{useEffect, useState} from "react";
import { Layout } from "../components";
import {WebCamRecorder} from "../components";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import "../components/styles/Recording.css"
function Recording(){
    const auth = getAuth();
    
    useState(()=>{

        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const username=user.displayName
                const userEmail=user.email
                // const usTitle=document.getElementById("us")

                if(username){
                    console.log(username)
                    usTitle.innerHTML=username
                }else{
                    console.log(userEmail)
                    // usTitle.innerHTML=userEmail
                    // usTitle.innerHTML="hola"
                    setTimeout(() => {
                        const usTitle=document.getElementById("us")
                        // console.log(usTitle)
                        usTitle.innerHTML=userEmail
                    }, 2000);
                    
                }

                // setLog(true)
                // ...
            } else {
                console.log("user signed out")
                // setLog(false)
                // User is signed out
                // ...
            }
            });
    },[])
return(
    <Layout>
        <div style={{
            marginTop:"20vh"
        }}>
        <div className="Record">
            <h1 id="us"></h1>
            <WebCamRecorder/>
        </div>
        </div>
    </Layout>
)
}
export default Recording;