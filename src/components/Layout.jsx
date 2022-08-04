import React,{useEffect, useState} from "react";

function Layout({children}){
    const[loading,setLoading]=useState(true)
    const changeState=()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    if(loading){
        changeState();
        return(
            <div>CARGANDO...</div>
        )
    }
    else{
        return(
            <div>
                <nav>
                    <ul>
                        <li>esta es la barra de navegación</li>
                    </ul>
                </nav>

                <main>
                    {children}
                </main>
            </div>
        )

    }


}

export default Layout;