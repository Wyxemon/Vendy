import './style.css';
import logo from '../../assets/vendy.svg';
import imgHome from '../../assets/homeImage.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigator = useNavigate();
  
  function login() {
    navigator('/login');
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
          <p>Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p>
          <button onClick={login}>Empieza ya</button>
        </div>
        <div className='div-img-main'>
          <img src={imgHome} alt="Vendy Logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
