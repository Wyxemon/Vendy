import "./style.css";
import { useEffect, useState } from "react";
import imgInfo from "../../../../../../assets/info.png";
import { getAccountItems } from "../../../../../../firebase/auth";
import ItemInterface from "../../ShopContent/ShopTable/Item/ItemInterface";

function ShopTable({ forceUpdate, setForceUpdate }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);


  useEffect(() => {
    async function dataItems() {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email.replace(/\./g, "_");

      const data = await getAccountItems(email);
      console.log(data);
      if (data) {
        const dataArray = Object.entries(data);
        setItems(dataArray);
        setCount(dataArray.length);
      } else {
        setItems([]);
        setCount(0);
      }
    }
    dataItems();
  }, [forceUpdate]);

  return (
    <div className="div-shop-items">
    {selectedItem && <ItemInterface item={selectedItem} onClose={() => setSelectedItem(null)} update={() => setForceUpdate(forceUpdate + 1)}/>}
      <p id="p-counter-table">
        <span>{count}</span>/30
      </p>
      <table>
        <thead>
          <tr id="tr-header-table">
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="tr-items" key={index} onClick={() => setSelectedItem(item)}>
              <td>{item[1].name}</td>
              <td>{item[1].price}</td>
              <td>{item[1].description}</td>
              <td className="td-info">
                <button onClick={() => setSelectedItem(item)}>
                  <img src={imgInfo} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShopTable;
