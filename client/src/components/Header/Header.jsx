import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Header(props) {
    console.log(props)
  const { setLoggedIn, profileData } = props;
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
      if(profileData) {
          const profileName = profileData.tokenInfo.name;
        setName(profileName);
      }
  }, [profileData]);

  const handleLogout = () => {
    console.log(history);
    setLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("clientAuthToken");
    sessionStorage.removeItem("isAdmin");
    history.push("/login");

    // const authToken = sessionStorage.getItem("clientAuthToken");
    // axios
    //   .get("http://localhost:8080/logout", {
    //     headers: {
    //       authorization: `Bearer ${authToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     setLoggedIn(false);
    //     sessionStorage.removeItem("isLoggedIn");
    //     sessionStorage.removeItem("clientAuthToken");
    //     console.log("Logout success");
    //     history.push("/login");
    //   })
    //   .catch((err) => {
    //     console.log("profile error", err);

    //   });
  };

  return (
    <div>
      <div>
        <h1>Maple Auto Centre</h1>
        {name && <span>{name}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
