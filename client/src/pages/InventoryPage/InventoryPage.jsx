import React from 'react';
import InventoryList from '../../components/InventoryList';
import VehicleDetails from '../../components/VehicleDetails';

function InventoryPage(props) {
    return (
        <div>
            {/* <InventoryList/> */}
            <VehicleDetails/>
        </div>
    );
}

export default InventoryPage;