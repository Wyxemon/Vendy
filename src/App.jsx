import "./App.css";
import Login from "./components/auth/Login"; // componente de inicio de sesión
import Register from "./components/auth/Register"; // componente de registrar
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/notFound/NotFound"; // componente de no encontrado
import Dashboard from "./components/dashboard/Dashboard"; // componente de menu
import Home from "./components/main/Home"; // componente de Landing Page
 

// directorios o rutas en la web
function App() {
  localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
        {/*en cada ruta (path) que componente se va mostrar*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// Mensaje
console.log(``);

export default App;
