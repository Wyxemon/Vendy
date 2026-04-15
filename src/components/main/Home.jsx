import './style.css';
import logo from '../../assets/vendy.svg';
import imgHome from '../../assets/homeImage.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  function login() {
    navigate('/login');
  }

  return (
    <div className='div-main'>
      <header>
        <img src={logo} alt="Vendy Logo" />
        <button onClick={login}>Iniciar sesión</button>
      </header>
      <div className='div-header-space'></div>
      <div className='div-body'>
        <div className='div-text-main'>
          <h1>Digitaliza tu negocio creando una tienda</h1>
          <p>Crea tu propia tienda con Vendy y comienza a automatizar tus ventas. Tu negocio necesita una pantalla para mostrar tu catálogo y procesar pedidos de manera eficiente.</p>
          <button id='button-main' onClick={login}>Empieza ya</button>
        </div>
        <div className='div-img-main'>
          <img src={imgHome} alt="Imagen de tienda en línea" />
        </div>
      </div>
    </div>
  );
}

export default Home;
