import React from "react";
import { Layout } from "../components";
import {WebCamRecorder} from "../components";
import "../components/styles/Recording.css"
function Recording(){
return(
    <Layout>
        <div>
        <div className="Record">
            <h1>NOMBRE DE USUARIO</h1>
            <WebCamRecorder/>
        </div>
        </div>
    </Layout>
)
}
export default Recording;