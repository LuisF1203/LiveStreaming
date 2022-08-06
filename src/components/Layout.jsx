import React,{useEffect, useState} from "react";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import {WebCamRecorder, Login} from "../components";
import {BsDot} from "react-icons/bs"
import "../components/styles/Layout.css"

function Layout({children}){
    const [logged,setLog]=useState(false) //this state is to check if the user is logged
    const auth = getAuth(); //with this function we get the auth function from firebase

    useState(()=>{ //we check if our user is logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("user logged =>",user)
                setLog(true)
                // if we have a user logged, we set our state to true
            } else {
                console.log("user signed out")
                setLog(false)
                // if we don´t have a user logged, we set our state to false
            }
            });
    },[])


    const out=()=>{ //with this function we logout our current user
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        console.log(error)
        });
    }


    const[loading,setLoading]=useState(true) //with this state we create a loading

    const changeState=()=>{ // We create a timeout function to set our loading to false after 2000ms
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    if(loading){ // if our loading state is true or equivalent, we call our changeState function and return our loading view
        changeState();
        return(
            <div className="Char"><span className="CharDot one"> <BsDot/> </span><span className="CharDot two"> <BsDot/> </span><span className="CharDot three"> <BsDot/> </span></div>
        )
    }
    else{ // if our loading state is false or equivalent, we return our main view
        return(
            <div>
                <main 
                style={{
                    marginTop:"70px"
                }}
                >
                    {logged&& // if we have an active user session, we return our layout with a children, so we can render anything inside
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
                            {children/*in here we can render something inside our layout*/} 
                        </div>
                        
                    }
                    {!logged&& //if we don´t have an active session we render our login component 
                    <Login/> 
                    }
                </main>
            </div>
        )

    }


}

export default Layout; //we export our layout component