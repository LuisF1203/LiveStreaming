import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import "../components/styles/Login.css"
// import auth from "../firebase/firebaseConfig"
function Login(){
    const[CreateBtn,SetCreateBtn]=useState(null) //this state is to verify if we want to login or signup
    const auth = getAuth(); //with this function we get the auth function from firebase
    const sign=(e)=>{ //with this function we create a new user
        const form=document.getElementById("form") //we get our form
        e.preventDefault(); // we prevent it from default setting, like reloading our page
        const email= form.email.value; //we get the user email
        const pass= form.pass.value; //we get the user password
        console.log(email,pass)
        createUserWithEmailAndPassword(auth, email, pass) //with this function we create a new user in firebase, we need to pass our auth, email and password
        .then((userCredential) => {
            const user = userCredential.user; //when firebase create our user, we get it 
            console.log("user created =>",user) //we can show it 
        })
        .catch((error) => { //if an error ocurred
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,"=>",errorMessage)
            document.getElementById("logError").innerHTML=errorCode; // we show our code error
        });
    }
const log=(e)=>{ //with this function we log a user 
    const form=document.getElementById("form")//we get our form
    e.preventDefault();// we prevent it from default setting, like reloading our page
    const email= form.email.value;//we get the user email
    const pass= form.pass.value;//we get the user password
    signInWithEmailAndPassword(auth, email, pass)//with this function we log a user with firebase, we need to pass our auth, email and password
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user logged in =>",user)
        // ...
    })
    .catch((error) => { //if an error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,"=>",errorMessage)
        document.getElementById("logError").innerHTML=errorCode; // we show our code error
        if(errorCode=="auth/wrong-password"){ // if our error is because a wrong password, we animate our input[type="password"]
            const inputPass=form.pass; //we get the input
            console.log(inputPass)
            inputPass.style.borderBottom="2px solid red" 
            inputPass.style.animation="wrong 0.2s 3" //passing these attributes, the css can load a keyframe related to this animation name
            
        }
    });

    console.log(email,pass)
}
return( //we load our login component
    <div className="LogIn">
        {!CreateBtn&&<div> {/*if CreateBtn is false or equivalent, we render our login form */}
        <h1>LOGIN</h1>
        <form id="form" onSubmit={log}> {/*When we submit our form, it will run the log function*/}
            <input type="email" name="email" required placeholder="email"/>
            <br />
            <input type="password" name="pass" id="passInput"  required placeholder="password"/>
            <br />
            <p id="logError"></p>
            <a href="#">Forgot password?</a>
            <br />
            <br />
            <input type="submit" value="Login" />
            <br />
            <br />
            <a onClick={()=>{
            SetCreateBtn(true) /*When we click at this, it will change CreateBtn to true*/
        }}>Create Account</a>
        </form>
        </div>}
        {CreateBtn&&<div> {/*if CreateBtn is true or equivalent, we render our signup form */}
        <h1>SignUp</h1>
        <form id="form" onSubmit={sign}> {/*When we submit our form, it will run the sign function*/}
            <input type="email" name="email" required placeholder="email"/>
            <br />
            <input type="password" name="pass" id=""  required placeholder="password"/>
            <br />
            <p id="logError"></p>
            <a href="#">Forgot password?</a>
            <br />
            <br />
            <input type="submit" value="SignUp" />
            <br />
            <br />
            <a onClick={()=>{
            SetCreateBtn(false) /*When we click at this, it will change CreateBtn to false*/
        }}>Create Account</a>
        </form>
        </div>}
    </div>
)
}
export default Login;//we export our Login component