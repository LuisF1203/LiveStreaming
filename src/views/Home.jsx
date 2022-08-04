import React , {useEffect} from "react";
import { Layout } from "../components";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firebaseConfig"
function Home(){
    useEffect(()=>{
        console.log(import.meta.env.VITE_APP_FIREBASE_APIKEY)
        console.log(import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN)
        console.log(import.meta.env.VITE_APP_FIREBASE_PROJECTID)
        console.log(import.meta.env.VITE_APP_FIREBASE_STORAGEBUCKET)
        console.log(import.meta.env.VITE_APP_FIREBASE_MESSAGINGSENDERID)
        console.log(import.meta.env.VITE_APP_FIREBASE_APPID)


        const getData=async()=>{
            // const data= await(getDocs(collection(db, 'users')))
            // console.log(data.docs[0].data())
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
            console.log(doc.id,"=>",doc.data());
            });
        }

        // const querySnapshot = await getDocs(collection(db, "users"));
        // querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // });
        getData()
    },[])
return(
    <Layout>
        <div>
        <h1>SECCION HOME</h1>
        </div>
    </Layout>

)

}

export default Home;