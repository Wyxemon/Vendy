import './style.css';
import closeImg from '../../assets/close.svg';
import googleLogo from '../../assets/google.svg';
import { signInWithGoogle } from "../../firebase/auth";
import arrowImg from '../../assets/arrow.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function RegisterWindow({ onClose }) {

    const navigate = useNavigate();
    const inputEmail = useRef();

    useEffect(() => {
        /* cerrar ventana si se pulsa esc*/
        function closeWindow(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        
        window.addEventListener('keydown', closeWindow);

        return () => {window.removeEventListener('keydown', closeWindow)};
    }, [onClose]);

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
        <div className='div-body-login-window' onClick={() => {onClose()}}>
            <div className='div-register-window' onClick={(e) => e.stopPropagation()}>
                <h1>Registrate gratis y prueba las ventajas de Vendy</h1>
                <p>Crea tu tienda online en minutos con Vendy, fácil y sin complicaciones.</p>
                <input className='input-email-register' type="text" placeholder='Tu correo electrónico' ref={inputEmail}/>
                <button id='button-continue' onClick={() => {navigate(`/register?email=${inputEmail.current.value}`)}}>
                    <img src={arrowImg} alt="Arrow" />
                    Continuar con correo electrónico</button>
                <button id='button-close' onClick={onClose}>
                    <img src={closeImg} alt="Close" />
                </button>
                <p>o</p>
                <button className="button-loginGoogle" onClick={signInWithGoogleLogin}>
                    <img src={googleLogo} alt="Google Logo" />
                    Continuar con Google
                </button>
                <p>¿Ya tienes una cuenta? <span onClick={() => navigate("/login")}>Inicia sesión</span></p>
            </div>
        </div>
    );
}

export default RegisterWindow;