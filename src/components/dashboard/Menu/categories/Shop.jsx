import "./style.css";
import imgPerson from "../../../../assets/menu/personBlack.svg";
import ShopContent from "./ShopContent/ShopContent";
import Profile from "./Profile/Profile";
import { useEffect, useRef, useState } from "react";
import imgUpload from "../../../../assets/upload.svg";
import imgVendy from "../../../../assets/vendy.svg";
import { addBannerImg, convertToBase64, readBannerImg, addBannerInformation, getBannerInformation } from "../../../../firebase/auth";
import { useLayoutEffect } from "react";
import downloadImg from "../../../../assets/download.svg";
import openNewImg from "../../../../assets/openNew.svg";

function Shop() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.email.split("@")[0];
  const refTextarea = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const imgInputRef = useRef(null);
  const [imgBanner, setImgBanner] = useState(null);
  const [updateBanner, setUpdateBanner] = useState(0);
  const [valueTitle, setValueTitle] = useState("");
  const [valueDescription, setValueDescription] = useState("");

  useLayoutEffect(() => { // lo mismo que useEffect pero se ejecuta antes de mostrar ui (evitar el parpadeo)
    const a = refTextarea.current;
    a.style.height = "auto";
    a.style.height = a.scrollHeight + "px";
  }, [valueDescription]);


  useEffect(() => {
    readBannerImg(user?.email).then((img) => {
      if (img) {
        setImgBanner(img);
      }
    });
    getBannerInformation(user?.email, 'title').then(a => {
      if (a) {
        setValueTitle(a)
      }
    })
    getBannerInformation(user?.email, 'description').then(a => {
      if (a) {
        setValueDescription(a)
      }
    })

  }, [updateBanner]);

  function bannerImg() {
    imgInputRef.current.click();
    addBannerImg(user?.email, convertToBase64(selectedFile));
  }

  async function onChangeInputImg(e) {
    const file = e.target.files[0];

    const img = await convertToBase64(file);
    await addBannerImg(user?.email, img);

    setUpdateBanner(prev => prev + 1);
    console.log("Banner actualizado");
  }

  function download() {
    const url = "https://github.com/Wyxemon/Vendy-desktop/releases/download/1.0.0/Vendy.exe";
    const a = document.createElement('a');
    a.href = url;
    a.download = "Vendy.exe";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="div-shop">
      <div className="div-width-error">
        <img src={imgVendy} alt="Logo" />
        <h4>Lo sentimos, Vendy no está disponible en este dispositivo</h4>
        <p>La resolución de tu pantalla no es compatible, por lo que la aplicación no puede mostrarse correctamente.</p>
      </div>
      <div id="header-shop">
        <button id="button-dowload" onClick={download}>
          <img src={downloadImg} alt="Download" />
          Descargar en Windows
        </button>
        <button id="button-view" onClick={(e) => { window.open(`https://vendy-view.vercel.app/?email=${user?.email}`, "_blank") }}>
          <img src={openNewImg} alt="Open new window" />Ver tienda
        </button>
      </div>
      <div className="div-user">
        <div className="div-user-info">
          <h2>Bienvenido, {name}</h2>
          <span id="span-email">{user?.email}</span>
          <button id="button-user-info" onClick={() => setIsProfileOpen(true)}>
            <img src={imgPerson} alt="User" />
          </button>
          {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} user={user} />}
        </div>


        {/* Información del negocio */}
        <h3 className="h3-section-text">Banner de tu negocio</h3>
        <div className="div-business-info">
          <button id="button-open-new-tab" onClick={(e) => { window.open(`https://vendy-view.vercel.app/?email=${user?.email}`, "_blank") }}>
            <img src={openNewImg} alt="Open new tab img" />
          </button>
          <input type="file" accept="image/*" id="input-banner" onChange={onChangeInputImg} ref={imgInputRef} />
          <p>Selecciona una imagen para tu banner</p>
          <button id="button-banner-img" onClick={bannerImg} style={{ backgroundImage: `url(${imgBanner})`, backgroundSize: "cover", backgroundPosition: "center", }}>
            <img src={imgUpload} alt="Upload Banner" />
          </button>
          <input id="h3-input" type="text" value={valueTitle} onBlur={(e) => { addBannerInformation(user?.email, 'title', e.target.value); }} onChange={(e) => { setValueTitle(e.target.value); }} />
          <textarea id="p-input" type="text" ref={refTextarea} value={valueDescription} onBlur={(e) => { addBannerInformation(user?.email, 'description', e.target.value); }} onChange={(e) => { setValueDescription(e.target.value); }} />
        </div>
      </div>

      <span id="span-separate"></span>
      <div className="div-shop-section">
        <h3 className="h3-section-text">Tu Vendy</h3>
        <ShopContent />
      </div>

      <h3 className="h3-section-text">Vista previa</h3>
      <iframe src={`https://vendy-view.vercel.app/?email=${user?.email}`} frameborder="0">
      </iframe>
    </div>
  );
}

export default Shop;
