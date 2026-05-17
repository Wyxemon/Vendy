import "./style.css"; // CSS
import { signInWithGoogle, signInWithEmail } from "../../firebase/auth"; // importar 
import googleLogo from "../../assets/google.svg";
import arrow from "../../assets/arrow.png";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef(); // referencias (para coger el valor de la etiqueta)
  const passwordRef = useRef(); // referencias
  const navigate = useNavigate(); // referencias 
  
  async function loginWithEmail(event) {
    event.preventDefault(); // al enviar un form submit se recarga entonces esto previene eso
    try { // intentar
      const user = await signInWithEmail(
        emailRef.current.value,
        passwordRef.current.value,
      );

      // guardar localmente
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: emailRef.current.value,
          uid: user.uid,
        }),
      );
      navigate("/dashboard"); // navegar
    } catch (error) { // si da error
      alert("Error al iniciar sesión con correo y contraseña");
    }
  }

  async function signInWithGoogleLogin() {
    try {
      const user = await signInWithGoogle(); // llamar funcion de login anteriormente creada en auth.js
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          uid: user.uid,
        }),
      );
      navigate("/dashboard");
    } catch (error) {
      alert("Error al iniciar sesión con Google");
    }
  }

  // HTML
  return (
    <div className="div-body-register">
      <div className="div-container">
        <h1>Inicio sesión o crea una cuenta para tu negocio</h1>
        <p>Usa tu correo electrónico u correo electrónico para acceder a Vendy.</p>
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

        <Link to="/register" className="link-register">
          <span>¿No tienes una cuenta?</span> Crear una
        </Link>
      </div>
    </div>
  );
}

export default Login;
