import { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
import imageArrow from '../../assets/arrow.png';
import imageElement from '../../assets/dashboard_element.png';
import imageRefresh from '../../assets/refresh.png';
import { storageUser, checkUserExists } from '../../firebase/auth';
import Menu from './Menu/Menu';

function Welcome() {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState(null);
    const [showRefresh, setShowRefresh] = useState(false);
    const [hideGenerate, setHideGenerate] = useState(false);
    const [hideClass, setHideClass] = useState('show');
    const [userExists, setUserExists] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storageUserData = localStorage.getItem('user');

        if (!storageUserData) {
            navigate('/login');
        } else {
            setUserObj(JSON.parse(storageUserData));
        }
    }, [navigate]);

    useEffect(() => {
        if (!userObj) return;

        checkUserExists(userObj.email).then(exists => {
            setUserExists(exists);
            setLoading(false);
        });
    }, [userObj]);

    if (loading) {
        return null;
    }

    function handleGenerateCode() {
        setHideClass('hide');
        setTimeout(() => {
            setHideGenerate(true);
            setShowRefresh(true);
        }, 150);
        storageUser(userObj.email).then(() => {
            setTimeout(() => {
                setShowMenu(true);
            }, 1500);
        });
    }

    if (userExists || showMenu) {
        return (
            <Menu />
        )
    } else if (!userExists && !showMenu) {
        return (
            <div id="div-dashboard">
                <div id="div-dashboard-right">
                    <div id="div-dashboard-right-menu">
                        <h1>Genera el codigo de tu aplicacion</h1>
                        <img id='img-element-dashboard' src={imageElement} />
                        <button id='div-right-menu-code' onClick={handleGenerateCode}>

                            {!hideGenerate && (
                                <span className={`btn-content ${hideClass}`}>
                                    <img id='img-arrow' src={imageArrow} />
                                    <p>Generar codigo</p>
                                </span>
                            )}

                            {showRefresh && (
                                <span className="btn-content show">
                                    <img id='img-refresh' src={imageRefresh} />
                                </span>
                            )}

                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Welcome