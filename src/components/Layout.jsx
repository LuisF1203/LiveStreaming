import React,{useEffect, useState} from "react";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import {WebCamRecorder, Login} from "../components";
import "../components/styles/Layout.css"

function Layout({children}){
    const [logged,setLog]=useState(false)
    const auth = getAuth();

    useState(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("user logged =>",user)
                setLog(true)
                // ...
            } else {
                console.log("user signed out")
                setLog(false)
                // User is signed out
                // ...
            }
            });
    },[])



    const[loading,setLoading]=useState(true)
    const changeState=()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    if(loading){
        changeState();
        return(
            <div>CARGANDO...</div>
        )
    }
    else{
        return(
            <div>
                <main 
                style={{
                    marginTop:"25px"
                }}
                >
                    {logged&&children}
                    {!logged&&
                    <Login/> 
                    }
                </main>
            </div>
        )

    }


}

export default Layout;