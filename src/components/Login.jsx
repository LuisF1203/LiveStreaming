import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import "../components/styles/Login.css"
// import auth from "../firebase/firebaseConfig"
function Login(){
    const[CreateBtn,SetCreateBtn]=useState(null)
    const auth = getAuth();
    const sign=(e)=>{
        const form=document.getElementById("form")
        e.preventDefault();
        const email= form.email.value;
        const pass= form.pass.value;
        console.log(email,pass)
        
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user created =>",user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,"=>",errorMessage)
        });
    }
const log=(e)=>{        
    const form=document.getElementById("form")
    e.preventDefault();
    const email= form.email.value;
    const pass= form.pass.value;
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user logged in =>",user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,"=>",errorMessage)
    });

    console.log(email,pass)
}
return(
    <div className="LogIn">
        {!CreateBtn&&<div>
        <h1>LOGIN</h1>
        <form id="form" onSubmit={log}>
            <input type="email" name="email" required placeholder="email"/>
            <br />
            <input type="password" name="pass" id=""  required placeholder="password"/>
            <br />
            <a href="#">Forgot password?</a>
            <br />
            <br />
            <input type="submit" value="Login" />
            <br />
            <br />
            <a onClick={()=>{
            SetCreateBtn(true)
        }}>Create Account</a>
        </form>
        </div>}
        {CreateBtn&&<div>
        <h1>SignUp</h1>
        <form id="form" onSubmit={sign}>
            <input type="email" name="email" required placeholder="email"/>
            <br />
            <input type="password" name="pass" id=""  required placeholder="password"/>
            <br />
            <a href="#">Forgot password?</a>
            <br />
            <br />
            <input type="submit" value="Login" />
            <br />
            <br />
            <a onClick={()=>{
            SetCreateBtn(false)
        }}>Create Account</a>
        </form>
        </div>}
    </div>
)
}
export default Login