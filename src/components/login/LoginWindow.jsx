import './style.css';
import googleLogo from '../../assets/google.svg';
import arrowImg from '../../assets/arrow.png';
import closeImg from '../../assets/close.svg';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail } from "../../firebase/auth";
import { useRef, useState } from 'react';

function LoginWindow({ onClose }) {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showEmailError, setShowEmailError] = useState(false);

    function loginRegister() {
        navigate('/register');
    }

    async function loginWithEmail(event) {
        event.preventDefault();
        try {
            const user = await signInWithEmail(
                emailRef.current.value,
                passwordRef.current.value,
            );
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: emailRef.current.value,
                    uid: user.uid,
                }),
            );
            navigate("/dashboard");
        } catch (error) {
            console.log("Error al iniciar sesión con correo y contraseña");
            setShowEmailError(true);
        }
    }

    async function signInWithGoogleLogin() {
        try {
            const user = await signInWithGoogle();
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: user.email,
                    uid: user.uid,
                }),
            );
            navigate("/dashboard");
        } catch (error) {
            console.log("Error al iniciar sesión con Google");
        }
    }

    return (
        <div className="div-body-login-window" onClick={(e) => { onClose() }}>
            <div className='div-login-window' onClick={(e) => {e.stopPropagation()}}>
                <h1>Inicia sesión o regístrate en un momento</h1>
                <p id='p-description'>Usa tu correo electrónico u correo electrónico para acceder a Vendy. <span onClick={loginRegister} id='span-register'>Registrar si no tienes cuenta</span></p>
                <button className="button-loginGoogle" onClick={signInWithGoogleLogin}>
                    <img src={googleLogo} alt="Google Logo" />
                    Continuar con Google
                </button>
                <p>o</p>
                <form onSubmit={loginWithEmail} className="form-inputs-login-window">
                    <input
                        className="input-login-window"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                        ref={emailRef}
                        />
                    <input
                        className="input-login-window"
                        type="password"
                        placeholder="Contraseña"
                        minLength={6}
                        ref={passwordRef}
                        />
                    <button className="button-login-window">
                        <img src={arrowImg} alt="Arrow image" />
                        Iniciar sesión
                    </button>
                </form>
                {showEmailError && (
                    <span id='span-error'>Inicio de sesion incorrecto</span>
                )}
                <button id='button-close' onClick={onClose}>
                    <img src={closeImg} alt="Close" />
                </button>
            </div>
        </div>
    );
}

export default LoginWindow;