import './style.css'
import { registerUser } from '../../firebase/auth'
import arrow from '../../assets/arrow.png';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import AccountCreated from './AccountCreated';
import { useSearchParams } from 'react-router-dom';

function Register() {
    const [searchParams, setSearchParams] = useSearchParams();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();
    const [accountCreated, setAccountCreated] = useState(false);

    function handleRegister(event) {
        event.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const repeatPassword = repeatPasswordRef.current?.value;
        if (password !== repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        registerUser(emailRef.current.value, passwordRef.current.value).then(() => {
            setAccountCreated(true);
        });
    }

    const email = searchParams.get('email');

    return (
        <div className='div-body-register'>
            <div className="div-container" id='div-register-container'>
                <h1 id='h1-register'>Crear una cuenta de Vendy</h1>
                <p>¡Empieza hoy! Regístrate gratis y lleva tu negocio al siguiente nivel.</p>
                <form onSubmit={handleRegister} className="form-inputs" id='form-register'>
                    <input className='input' ref={emailRef} id='email' type="email" placeholder="Correo electrónico" required defaultValue={email || ''} />
                    <label>Contraseña</label>
                    <input className='input' ref={passwordRef} type="password" placeholder="Contraseña" minLength={6} />
                    <input className='input' ref={repeatPasswordRef} type="password" placeholder="Repite la contraseña" minLength={6} />
                    <button type='submit' className='button-loginEmail'>
                        <img src={arrow} alt="Arrow image" />
                        Crear una cuenta
                    </button>
                </form>
                <Link to='/login' className="link-register">
                    <span>¿Ya tienes una cuenta?</span> Inicia sesión
                </Link>

                {accountCreated && (
                    <AccountCreated />
                )}
            </div>
        </div>
    );
}

export default Register;