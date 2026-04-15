import './style.css'
import { registerUser } from '../../firebase/auth'
import arrow from '../../assets/arrow.png';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import vendyLogo from '../../assets/vendy.svg'
import registerElement from '../../assets/register_element.png'
import AccountCreated from './AccountCreated';

import { useNavigate } from "react-router-dom";

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [accountCreated, setAccountCreated] = useState(false);

    const navigate = useNavigate();

    function handleRegister(event) {
        event.preventDefault();
        registerUser(emailRef.current.value, passwordRef.current.value).then(() => {
            setAccountCreated(true);
        });
    }

    return (
        <div className="div-container" id='div-register-container'>
            <div id='header-login'>
                <img id='vendy-logo' src={vendyLogo} alt="Vendy logo" />
                <div className='header-div-content'>
                    <div className='header-div-name'>
                        <h2>Register</h2>
                    </div>
                    <div className='header-div-menu'>
                        <p onClick={() => navigate("/")}>Inicio</p>
                    </div>
                </div>
            </div>
            <img id='register-element' src={registerElement} />
            <h1 id='h1-register'>Crear una cuenta de Vendy</h1>
            <p id='p-login'>¡Empieza hoy! Regístrate gratis y lleva tu negocio al siguiente nivel.</p>
            <form onSubmit={handleRegister} className="form-inputs" id='form-register'>
                <label>Correo electrónico</label>
                <input className='input' ref={emailRef} id='email' type="email" placeholder="Correo electrónico" required />
                <label>Contraseña</label>
                <input className='input' ref={passwordRef} type="password" placeholder="Contraseña" minLength={6} />
                <button type='submit' className='button-loginEmail'>
                    <img src={arrow} alt="Arrow image" />
                    Crear una cuenta
                </button>
            </form>
            <Link to='/login' className="link-register">
                <span>¿Ya tienes una cuenta?</span> Inicia sesión
            </Link>

            {accountCreated && (
                <AccountCreated/>
            )}
        </div>
    );
}

export default Register;