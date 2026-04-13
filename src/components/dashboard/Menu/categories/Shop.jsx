import "./style.css";
import imgPerson from "../../../../assets/menu/person.png";
import ShopContent from "./ShopContent/ShopContent";
import Profile from "./Profile/Profile";
import { useState } from "react";

function Shop() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.email.split("@")[0];

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="div-shop">
      <div className="div-user">
        <div className="div-user-info">
          <h2>Bienvenido, {name}</h2>
          <span id="span-email">{user?.email}</span>
          <button id="button-user-info" onClick={() => setIsProfileOpen(true)}>
            <img src={imgPerson} alt="User" />
          </button>
          {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} user={user} />}
        </div>

        <h3 className="h3-section-text">Estadísticas</h3>
        <div className="div-user-statistics">
          <div className="div-connected-deviced div-box"></div>

          <div className="div-money div-box"></div>
        </div>
      </div>

      <span id="span-separate"></span>
      <div className="div-shop-section">
        <h3 className="h3-section-text">Tu Vendy</h3>
        <ShopContent />
      </div>
    </div>
  );
}

export default Shop;
