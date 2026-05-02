import './style.css';
import logo from '../../assets/vendy.svg';
import { useNavigate } from 'react-router-dom';
import downloadImg from '../../assets/download.svg';
import LoginWindow from '../login/LoginWindow';
import { useEffect, useState } from 'react';
import RegisterWindow from '../register/RegisterWindow';

function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    function closeWithKey(e) {
      if (e.key === 'Escape') {
        setShowLogin(false);
      }
    }

    window.addEventListener('keydown', closeWithKey);

    return () => { window.removeEventListener('keydown', closeWithKey) };
  }, [showLogin]);

  function login() {
    setShowLogin(true);
  }

  function exampleUser() {
    localStorage.setItem('user', JSON.stringify({ email: 'ejemplopublico@vendy.com' }));
    navigate('/dashboard');
  }

  function download() {
    const url = "https://github.com/Wyxemon/Vendy-desktop/releases/download/1.0.0/Vendy.exe";
    const a = document.createElement('a');
    a.href = url;
    a.download = "Vendy.exe";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className='div-main'>
      {showLogin && <LoginWindow onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterWindow onClose={() => setShowRegister(false)} />}
      <header>
        <img src={logo} alt="Vendy Logo" />
        <div>
          <button id='button-main-download' onClick={download}>
            <img src={downloadImg} alt="Download" />
            Descargar en Windows
          </button>
          <button id='button-main-login' onClick={login}>
            Iniciar sesión
          </button>
        </div>
      </header>
      <div className='div-body'>
        <div>
          <h1>Añade una tienda a tu negocio</h1>
          <p>Crea tu propia tienda con Vendy y comienza a automatizar tus ventas. Tu negocio necesita una pantalla para mostrar tu catálogo y procesar pedidos de manera eficiente.</p>
          <button id='button-main' onClick={() => setShowRegister(true)}>Empieza ya</button>
          <button id='button-viewexample' onClick={exampleUser}>Ver un ejemplo</button>
        </div>
        <iframe
          src="https://vendy-view.vercel.app/?email=ejemplo@vendy.com"
          frameBorder="0"
        />
      </div>
    </div>
  );
}

export default Home;
