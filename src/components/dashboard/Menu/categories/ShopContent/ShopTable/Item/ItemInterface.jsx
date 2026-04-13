import "./style.css";
import { editAccountItems, deleteItem } from "../../../../../../../firebase/auth";
import { useEffect, useState } from "react";
import imgDelete from '../../../../../../../assets/delete.png';

import escKey from '../../../../../../../assets/esc-key.png';

function ItemInterface({ item, onClose, update }) {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email.replace(/\./g, "_");
    setEmail(email);
    setName(item[1].name);
    setPrice(item[1].price);
    setDescription(item[1].description);
    setId(item[0]);

    function keyDown(event) {
      if (event.key === "Escape") {
        onClose();
        update();
      }
    }

    window.addEventListener('keydown', keyDown)

  }, [item])

  async function saveItem() {
    await editAccountItems(email, item[0], name, Number(price), description);
    onClose();
    update();
  }

  return (
    <div className="div-background" onClick={() => onClose()}>
      <div className="div-esc-key div-esc-key-edit-item">
        <img src={escKey} />
        <p>Presiona ESC para salir</p>
      </div>
      <div className="div-item-interface" onClick={(e) => e.stopPropagation()}>
        <button id="button-save" onClick={saveItem}>
          <p>Guardar</p>
        </button>
        <div className="div-item-name">
          <div>
            <h3 className="h3-item-name">Editar</h3>
            <p>id: <span className="span-iten-name">{id}</span> <span>con este nombre está identificado internamente.</span></p>
          </div>
          <button className="button-delete" onClick={(e) => { deleteItem(email, id); onClose(); update(); }}>
            <img src={imgDelete} />
          </button>
        </div>
        <table className="table-item-edit">
          <tr className="tr-item-edit">
            <td className="td-item-edit">
              <label htmlFor="item-name">Nombre</label>
            </td>
            <td>
              <input
                id="item-name"
                className="input-item-edit"
                type="text"
                placeholder="Nombre del producto"
                required
                aria-required="true"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr className="tr-item-edit">
            <td className="td-item-edit">
              <label htmlFor="item-price">Precio</label>
            </td>
            <td>
              <input
                id="item-price"
                className="input-item-edit"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio del producto"
                required
                aria-required="true"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}

              />
            </td>
          </tr>
          <tr className="tr-item-edit">
            <td className="td-item-edit">
              <label htmlFor="item-description">Descripción</label>
            </td>
            <td>
              <textarea
                id="item-description"
                className="input-item-edit textarea-item-edit"
                placeholder="Descripción del producto"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>
          </tr>
        </table>
        <div id='div-space-edit-item'></div>
      </div>
    </div>
  );
}

export default ItemInterface;
