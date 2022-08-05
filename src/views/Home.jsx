import React , {useEffect,useState} from "react";
import { Layout } from "../components";
import { collection, getDocs,doc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebaseConfig"
import {WebCamRecorder, Login} from "../components";
function Home(){
    const [logged,setLog]=useState(false)
    //AQUI SE OBTIENE EL VIDEO
    // const [frame,setFrame]=useState(null)
    // useEffect(()=>{
    //     const unsub = onSnapshot(doc(db, "video", "stream"), (doc) => {
    //         console.log("Current data: ", doc.data());
    //         setFrame(doc.data().src)
    //     });
    // },[])
return(
    <Layout>

        {!logged&&
        <Login/>
        }
        {logged&&
        <div>
        <p>usuario inicado con exito</p>
        <h1>LIVE STREAM</h1>
        <WebCamRecorder/>
        <img src={frame}></img>
        </div>
        }

        {/* {logged?
        <p>Inicia sesión para continuar</p>
        :
        <p>Usuario iniciado</p>} */}
        {/* <div>
        <h1>LIVE STREAM</h1>
        <WebCamRecorder/>
        <img src={frame}></img>
        </div> */}
    </Layout>

)

}

export default Home;