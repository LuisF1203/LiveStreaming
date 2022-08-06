import React,{useEffect, useState} from "react";
import { Layout } from "../components";
import {WebCamRecorder} from "../components";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import "../components/styles/Recording.css"
function Recording(){
    const auth = getAuth();
    useState(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) { //if there is a user logged
                const uid = user.uid;
                const username=user.displayName
                const userEmail=user.email
                if(username){ // if there is a username
                    console.log(username)
                    usTitle.innerHTML=username //we show our current user username
                }else{ //if there is no username
                    console.log(userEmail)
                    setTimeout(() => {
                        const usTitle=document.getElementById("us")
                        usTitle.innerHTML=userEmail //we show our current user email 
                    }, 2000);
                    
                }
            } else {
                console.log("user signed out")
                // User is signed out
            }
            });
    },[])
return( //we render our Recording view
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
export default Recording; //we export our Recording view