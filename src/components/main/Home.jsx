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
          <p>Nuestra plataforma te permite crear y gestionar tu tienda en línea de manera fácil y rápida. Ofrece una experiencia de compra intuitiva para tus clientes y herramientas poderosas para administrar tu inventario y ventas.</p>
          <button onClick={login}>Empieza ya</button>
        </div>
        <div className='div-img-main'>
          <img src={imgHome} alt="Imagen de tienda en línea" />
        </div>
      </div>
    </div>
  );
}

export default Home;
