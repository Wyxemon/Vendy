import './style.css';
import { addItem } from "../../../../../../../../firebase/auth";
import { useEffect, useState } from 'react';
import escKey from '../../../../../../../../assets/esc-key.png';


function AddItem({ email, onClose, update }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState("");
    let itemName = name.toLowerCase() + Math.random().toString().substring(2, 5);

    function createItem() {
        addItem(email, itemName, name, price, description);
        onClose();
        update();
    }

    
    useEffect(() => {
        function keyDown(event) {
            if (event.key === "Escape") {
                onClose()
                update();
            }
        }

        window.addEventListener('keydown', keyDown)
    })


    return (
        <div className='div-background' onClick={() => onClose()}>
            <div className="div-esc-key div-esc-key-add-item">
                <img src={escKey} />
                <p>Presiona ESC para salir</p>
            </div>
            <div className="div-add-item" onClick={(e) => e.stopPropagation()}>
                <div className='div-table-add-item'>
                    <h2>Crear un nuevo artículo</h2>
                    <p>id: {itemName} <span>con este nombre se identificará en la base de datos.</span></p>
                </div>
                <div className='div-table-add-item'>
                    <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='div-table-add-item'>
                    <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className='div-table-add-item'>
                    <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div id='div-space'></div>
                <button className='button-add-item' onClick={createItem}>Crear</button>
            </div>
        </div>
    );
}

export default AddItem;