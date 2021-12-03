import React, {useState, useEffect} from 'react';
import axios from "axios";
import AddVehicle from "../AddVehicle";

const host = "http://localhost:8080";

function EditVehicleDetails(props) {
    const [vehicle, setVehicle] = useState({});
 
    useEffect(() => {;
      const { vin } = props.match.params;
      getCurrentVehicle(vin);
    }, []);
  
    const getCurrentVehicle = (vin) => {
      axios
        .get(`${host}/inventory/${vin}`)
        .then((response) => {
          setVehicle(response.data);
        })
        
        .catch((error) => console.log(error));
    };
    return (
        <div> 
            {vehicle && (
                <AddVehicle isEdit={true} vehicle={vehicle} />
            )}
        </div>
    );
}

export default EditVehicleDetails;
