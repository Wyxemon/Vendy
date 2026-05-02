import "./style.css";

import Shop from "./categories/Shop";

function Menu() {
  return (
    <>
      <div className="menu">
        <div id="div-content">
          <Shop />
        </div>
      </div>
    </>
  );
}

export default Menu;
