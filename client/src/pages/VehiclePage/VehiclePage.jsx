import React from 'react';
import VehicleDetails from '../../components/VehicleDetails';

function VehiclePage(props) {
    return (
        <div>
        <VehicleDetails {...props} />
        </div>
    );
}

export default VehiclePage;