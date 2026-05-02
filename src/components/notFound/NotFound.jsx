import './style.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Página no encontrada</h2>
      <p className="notfound-text">
        Lo sentimos, Vendy no encuentra la página, no existe o fue movida.
      </p>
    </div>
  );
}

export default NotFound;
