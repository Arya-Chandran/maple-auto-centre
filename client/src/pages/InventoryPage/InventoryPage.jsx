import React from 'react';
import InventoryList from '../../components/InventoryList';

function InventoryPage(props) {
    return (
        <div>
            <InventoryList {...props}/>
        </div>
    );
}

export default InventoryPage;