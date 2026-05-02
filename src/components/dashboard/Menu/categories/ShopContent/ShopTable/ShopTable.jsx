import "./style.css";
import { useEffect, useRef, useState } from "react";
import imgInfo from "../../../../../../assets/info.png";
import { getAccountItems, convertToBase64, addImgItem, getImgItem } from "../../../../../../firebase/auth";
import ItemInterface from "../../ShopContent/ShopTable/Item/ItemInterface";
import imgUpload from "../../../../../../assets/upload.svg";
import AddItem from "./../ShopTable/Item/AddItem/AddItem";

function ShopTable({ forceUpdate, setForceUpdate }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Bebidas");
  const [itemActiveId, setItemActiveId] = useState(null);

  // ref
  const inputRef = useRef(null);

  const userEmail = JSON.parse(localStorage.getItem('user'));
  const safeEmail = userEmail?.email.replace(/\./g, "_");

  useEffect(() => {
    async function dataItems() {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email.replace(/\./g, "_");

      const data = await getAccountItems(email);
      console.log(data);
      if (data) {
        const dataArray = Object.entries(data);
        setItems(dataArray);
      } else {
        setItems([]);
      }
    }
    dataItems();
  }, [forceUpdate]);

  async function uploadImgItem(e, id) {
    e.stopPropagation();
    const file = inputRef.current.files[0];    
    try {
      const base64 = await convertToBase64(file);
      await addImgItem(safeEmail, itemActiveId, base64);
      inputRef.current.value = '';
      setForceUpdate(prev => prev + 1);
    } catch(e) {
      console.error("Error al subir la imagen:", e);
    }
  }

  const filterItems = items.filter((e) => {
    const item = e[1];
    return item.category == selectedCategory;
  }
  );

  return (
    <div className="div-shop-items">
      {showAddItem && <AddItem email={safeEmail} onClose={() => setShowAddItem(null)} update={() => setForceUpdate(forceUpdate + 1)} category={selectedCategory} />}
      {selectedItem && <ItemInterface item={selectedItem} onClose={() => setSelectedItem(null)} update={() => setForceUpdate(forceUpdate + 1)} />}
      <div className="div-left-menu">
        <button className={selectedCategory == "Bebidas" ? "active" : ""} onClick={() => setSelectedCategory("Bebidas")}>Bebidas</button>
        <button className={selectedCategory == "Tapas" ? "active" : ""} onClick={() => setSelectedCategory("Tapas")}>Tapas</button>
        <button className={selectedCategory == "Bocadillos" ? "active" : ""} onClick={() => setSelectedCategory("Bocadillos")}>Bocadillos</button>
        <button className={selectedCategory == "Platos" ? "active" : ""} onClick={() => setSelectedCategory("Platos")}>Platos</button>
        <button className={selectedCategory == "Postres" ? "active" : ""} onClick={() => setSelectedCategory("Postres")}>Postres</button>
      </div>
      <div className="div-right-menu">
        <div className="div-shop-products">
          <input ref={inputRef} type="file" accept="image/*" style={{display: "none"}} onClick={(e) => e.stopPropagation()} onChange={uploadImgItem}/>
          {filterItems.map((item, index) => (
            <div className="div-items" key={index} onClick={() => setSelectedItem(item)}>
              <button id="button-upload-item" style={{backgroundImage: `url(${item[1].img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}} onClick={(e) => {setItemActiveId(item[0]); inputRef.current.click(); e.stopPropagation();}}>
                <img src={imgUpload} alt="Upload img" />
              </button>
              <div>
                <h4>{item[1].name}</h4>
                <p id="p-description-item">{item[1].description}</p>
              </div>
              <p id="p-price-item">{item[1].price} €</p>
              <img id="img-info-item" src={imgInfo} />
            </div>
          ))}
        </div>
        <button id="button-add-items" onClick={() => setShowAddItem(true)}>
          Añadir producto
        </button>
      </div>
    </div>
  );
}

export default ShopTable;
