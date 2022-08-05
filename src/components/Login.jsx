import React from "react";
import "../components/styles/Login.css"
function Login(){
    const log=(e)=>{
        const form=document.getElementById("form")
        e.preventDefault();
        const email= form.email.value;
        const pass= form.pass.value;
        console.log(email,pass)
        console.log("iniciando sesión")
    }
return(
    <div className="LogIn">
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
            <a href="#">Create Account</a>
        </form>
    </div>
)
}
export default Login