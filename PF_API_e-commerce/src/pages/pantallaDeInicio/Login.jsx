import React, { useState } from "react";
import './Login.css'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import user_icon from '../../assets/person.png'


const Login = () => {

    const [action,setAction] = useState("Crear Usuario");


    return(
        
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underLine"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Nombre" />
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className="forgot-password">¿Olvido su contraseña? <span>Haga click aca!</span></div>
            <div className="submit-container">
                <div className={action==="Iniciar Sesion"?"submit gray":"submit"}>Crear Usuario</div>
                <div className={action==="Crear Usuario"?"submit gray": "submit"}>Iniciar Sesion</div>
            </div>
        </div>
        
    )}

export default Login