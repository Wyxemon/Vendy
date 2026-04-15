import "./style.css";
import { signInWithGoogle, signInWithEmail } from "../../firebase/auth";
import googleLogo from "../../assets/google.svg";
import arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";
import { useRef } from "react";
import vendyLogo from "../../assets/vendy.svg";
import loginElement from "../../assets/login_element.png";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

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
    }
  }

  function toHome() {
    navigate("/");
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
    <>
      <div className="div-container">
        <div id="header-login">
          <img id="vendy-logo" src={vendyLogo} alt="Vendy logo" />
          <div className="header-div-content">
            <div className="header-div-name">
              <h2>Login</h2>
            </div>
            <div className="header-div-menu">
              <p onClick={() => navigate("/")}>Inicio</p>
            </div>
          </div>
        </div>
        <h1>Inicio sesión o crea una cuenta para tu negocio</h1>
        <button onClick={signInWithGoogleLogin} className="button-loginGoogle">
          <img src={googleLogo} alt="Google Logo" />
          Continuar con Google
        </button>
        <p>o</p>

        <form onSubmit={loginWithEmail} className="form-inputs">
          <input
            className="input"
            ref={emailRef}
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <input
            className="input"
            ref={passwordRef}
            type="password"
            placeholder="Contraseña"
            minLength={6}
          />
          <button className="button-loginEmail">
            <img src={arrow} alt="Arrow image" />
            Iniciar sesión
          </button>
        </form>

        <Link className="link-register">Restablecer contraseña</Link>
        <Link to="/register" className="link-register">
          <span>¿No tienes una cuenta?</span> Crear una
        </Link>

        <img id="img-element" src={loginElement} />
      </div>
    </>
  );
}

export default Login;
