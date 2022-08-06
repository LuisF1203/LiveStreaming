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
                setLog(true)
                // we get current user
            } else {
                setLog(false)
                // User is signed out
                // ...
            }
            });
    },[])
    



    
    const [frame,setFrame]=useState(null) //with this state we get our frame
    useEffect(()=>{//we get our frames
        const unsub = onSnapshot(doc(db, "video", "stream"), (doc) => { //we create an onSnapshot to get our doc from firebase, this will give us a realtime doc, so it will change our frame
            console.log("Current data: ", doc.data());
            setFrame(doc.data().src) //we set our frame
        });
    },[])
return(
    <Layout>
        {!logged&& //if user is not logged we render our login component
        <Login/>
        }
        {logged&& //if user is logged we render our homepage
        <div>
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
        </div>
        }
    </Layout>

)

}

export default Home; //we export our home view