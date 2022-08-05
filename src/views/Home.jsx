import React , {useEffect,useState} from "react";
import { Layout } from "../components";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { collection, getDocs,doc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig"
import {WebCamRecorder, Login} from "../components";
import "../components/styles/Home.css"
import {TbLivePhoto} from "react-icons/tb"
function Home(){
    const [logged,setLog]=useState(false)

    const auth = getAuth();

    useState(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // console.log("user logged =>",user)
                setLog(true)
                // ...
            } else {
                // console.log("user signed out")
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


    //AQUI SE OBTIENE EL VIDEO
    const [frame,setFrame]=useState(null)
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "video", "stream"), (doc) => {
            console.log("Current data: ", doc.data());
            setFrame(doc.data().src)
        });
    },[])
return(
    <Layout>
        {!logged&&
        <Login/>
        }
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




        {/* <p>usuario inicado con exito</p>
        <h1>LIVE STREAM</h1> */}
        <div className="streamInfo">
            <span className="live">LIVE <TbLivePhoto size={20}/> </span>
            <img className="videoStream" src={frame}></img>
            <div className="streamChatMain">
                <h3>STREAM CHAT</h3>
                <ul className="streamChat">
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                    <li><p><span className="streamChatUser">username</span>:hola</p></li>
                </ul>
                <form className="chatMsgForm">
                <input type="text" className="chatMsgInput" placeholder="Send a message"/>
                <br />
                <input type="submit" value="chat" />
                </form>
                
            </div>
        </div>
        {/* <WebCamRecorder/> */}
        </div>
        }
    </Layout>

)

}

export default Home;