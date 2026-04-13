import "./style.css";
import { useState, useEffect } from "react";
import { deleteAccount } from "../../../../../firebase/auth";
import escKey from './../../../../../assets/esc-key.png';

function Profile({ onClose, user }) {
    const [emailDelete, setEmailDelete] = useState("");
    function deleteData() {
        if (user?.email === emailDelete) {
            deleteAccount(user?.email);
            localStorage.clear();
            window.location.reload();
        } else {
            console.log("El email no coincide con el de la cuenta");
        }
    }

    useEffect(() => {
        function keyDown(event) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener('keydown', keyDown)
    })

    return (

        <div className="div-background" onClick={() => onClose()}>
            <div className="div-esc-key div-esc-key-edit-item">
                <img src={escKey} />
                <p>Presiona ESC para salir</p>
            </div>
            <div className="div-profile-interface" onClick={(e) => e.stopPropagation()}>
                <h2>Perfil</h2>
                <p>Actualmente tiene una cuenta en Vendy con el nombre <span>{user?.email.split("@")[0]}</span>. Puedes borrar tus datos en caso de que lo desees.</p>
                <div>
                    <input type="text" placeholder="Escribe tu email" value={emailDelete} onChange={(e) => setEmailDelete(e.target.value)} />
                    <button id="button-delete" onClick={deleteData}>Borrar datos</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;