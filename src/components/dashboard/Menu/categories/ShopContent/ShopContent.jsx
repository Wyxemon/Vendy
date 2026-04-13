import './style.css'
import AddImage from '../../../../../assets/add.png'
import ShopTable from './ShopTable/ShopTable'
import AddItem from "./ShopTable/Item/AddItem/AddItem";
import { useEffect, useState } from 'react';

function ShopContent() {
    const [showAddItem, setShowAddItem] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email.replace(/\./g, "_");

    return (
        <div className='div-shop-content'>
            {showAddItem && <AddItem email={email} onClose={() => setShowAddItem(null)} update={() => setForceUpdate(forceUpdate + 1)}/>}
            <button id='button-add' onClick={() => setShowAddItem(true)}>
                <img src={AddImage} alt="Add" />
            </button>
            <ShopTable forceUpdate={forceUpdate} setForceUpdate={setForceUpdate}/>
        </div>
    );
}

export default ShopContent;