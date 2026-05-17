import './style.css';
import logo from '../../assets/vendy.svg';
import { useNavigate } from 'react-router-dom';
import downloadImg from '../../assets/download.svg';
import LoginWindow from '../login/LoginWindow';
import { useEffect, useState } from 'react';
import RegisterWindow from '../register/RegisterWindow';
import img1 from '../../assets/image2.png';
import hamburgesaImg from '../../assets/hamburgesa.png';
import arrowDown from '../../assets/arrowDown.svg'
import signature from '../../assets/firma.png'
import openNew from '../../assets/openNew.svg'

function Home() {
  const navigate = useNavigate(); // web orrien artean nabegatzeko

  // useState (aldagai batzuk bezalakoak)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // teklatu bidez itxi

    function closeWithKey(e) {
      if (e.key === 'Escape') {
        setShowLogin(false);
      }
    }

    window.addEventListener('keydown', closeWithKey);

    return () => { window.removeEventListener('keydown', closeWithKey) };
  }, [showLogin]);

  function login() { // saioa hasteko menua erakutsi
    setShowLogin(true);
  }

  function exampleUser() { // adibidea erakutsi
    localStorage.setItem('user', JSON.stringify({ email: 'ejemplopublico@vendy.com' }));
    navigate('/dashboard');
  }

  function download() {
    const url = "https://github.com/Wyxemon/Vendy-desktop/releases/download/1.0.0/Vendy.exe";
    const a = document.createElement('a'); // sortu a elementu bat 
    
    a.href = url; // hurrengo web gunetik
    a.download = "Vendy.exe"; // hurrengo fitxategia descargatu
    document.body.appendChild(a); // gehitu web orrian
    a.click(); // fitxategia non utziko den ateratezko menua
    document.body.removeChild(a); // kendu
  }

  // interfaza
  return (
    <div className='div-main'>
      {showLogin && <LoginWindow onClose={() => setShowLogin(false)} />} {/*menua atera/kendu | true bada utziko du, false bada ez (showLogin)*/}
      {showRegister && <RegisterWindow onClose={() => setShowRegister(false)} />} {/*menua atera/kendu | true bada utziko du, false bada ez (showRegister)*/}
      
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
        <div id='div-iframe'>
          <button onClick={() => {window.open('https://vendy-view.vercel.app/?email=ejemplo@vendy.com', '_blank')}}> {/*web orri esteka ireki*/}
            <img src={openNew} alt="" />
          </button>
          <img src={arrowDown} alt="" />
          <iframe
            src="https://vendy-view.vercel.app/?email=ejemplo@vendy.com"
            frameBorder="0"
          />
        </div>
        <div id='div-desktop-main'>
          <div class="desktop-left">
            <h3>Aplicación de escritorio para tu negocio</h3>
            <p>
              Lleva tu catálogo a una pantalla con la app de escritorio de Vendy.
              Muestra tus productos como una carta digital o panel visual, ideal para restaurantes,
              bares o tiendas que quieren ofrecer una experiencia moderna y profesional a sus clientes.
            </p>
            <button onClick={download}>
              <img src={downloadImg} alt="Download" />
              Descargar Windows
            </button>
            <a href="https://github.com/Wyxemon/Vendy-desktop/releases/download/1.0.0/Vendy-arm64.dmg" download> {/*hurrengo estekatik fitxategia deskargatu*/}
              Descargar en MacOS
            </a>          </div>
          <div class="desktop-right">
            <img src={img1} alt="" />
          </div>
        </div>
        <div id='div-info-main'>
          <h3>Añade tus productos, facil y rapido</h3>
          <p>Con Vendy puedes crear y gestionar tu catálogo de productos de forma rápida y sencilla.
            Añade imágenes, precios y descripciones en segundos, organiza todo a tu manera y mantén
            tu negocio siempre actualizado sin complicaciones.
          </p>
          <div id='div-info-item'>
            <img src={hamburgesaImg} alt="" />
            <div id='div-right-info-item'>
              <h5>The Buey</h5>
              <p>Carne 100% de buey Valles del Esla®, cecina ahumada con salsa de yema de huevo, queso cheddar ahumado en pan estilo brioche.</p>
            </div>
          </div>
          <button>Añadir producto</button>
          <h4>Nosotros nos encargamos de mostrarlo</h4>
          <div id='div-vendy-view-info'>
            <div id='div-left-vendy-view-info'>
              <button>Platos</button>
            </div>
            <div id='div-right-vendy-view-info'>
              <img src={hamburgesaImg} alt="" />
              <div>
                <h6>The Buey</h6>
                <p>Carne 100% de buey Valles del Esla®, cecina ahumada con salsa de yema de huevo, queso cheddar ahumado en pan estilo brioche.</p>
              </div>
            </div>
          </div>
        </div>
        <div id='div-final-info'>
          <img src={signature} alt="" />
          <p>Desarrollado por Iñigo Viscarret Álvarez</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
