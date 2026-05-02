import './style.css'
import ShopTable from './ShopTable/ShopTable'
import { useState } from 'react';

function ShopContent() {
    const [forceUpdate, setForceUpdate] = useState(0);

    return (
        <div className='div-shop-content'>
            <ShopTable forceUpdate={forceUpdate} setForceUpdate={setForceUpdate}/>
        </div>
    );
}

export default ShopContent;