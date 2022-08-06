import React,{useEffect, useState} from "react";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import {WebCamRecorder, Login} from "../components";
import {BsDot} from "react-icons/bs"
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


    const out=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }


    const[loading,setLoading]=useState(true)
    const changeState=()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    if(loading){
        changeState();
        return(
            <div className="Char"><span className="CharDot one"> <BsDot/> </span><span className="CharDot two"> <BsDot/> </span><span className="CharDot three"> <BsDot/> </span></div>
        )
    }
    else{
        return(
            <div>
                <main 
                style={{
                    marginTop:"70px"
                }}
                >
                    {logged&&
                        <div>
                            <nav>
                                <ul>
                                    <li className="first">
                                            <a href="/">LiveStream</a>
                                    </li>
                                    <li className="mid">
                                        {/* <a href="/" className="sign">LogIn</a> */}
                                        <input type="text" placeholder="Aa"/>
                                        <button>search</button>
                                    </li>
                                    <li className="final">
                                        <ul>
                                            <li><a href="/live" className="GoLive">Go Live</a></li>
                                            <li><a onClick={out} className="sign out">SignOut</a></li>
                                        </ul>
                                        
                                        
                                    </li>
                                </ul>
                            </nav>
                            {children}
                        </div>
                        
                    }
                    {!logged&&
                    <Login/> 
                    }
                </main>
            </div>
        )

    }


}

export default Layout;