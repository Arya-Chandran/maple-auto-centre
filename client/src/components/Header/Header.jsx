import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { CgProfile } from "react-icons/cg";
import { FcContacts } from "react-icons/fc";
import { FcBusinessContact } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";


function Header(props) {
  console.log(props);
  const { setLoggedIn, profileData } = props;
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (profileData) {
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
  };

  return (
    <div>
      <div className="header">
        <div className="header__wrapper">
          <div className="header__left">
          <Link to="/inventory">
          <img className="header__image" src={logo} alt="Logo" />
          </Link>
        
          <h2 className="header__title">Maple-Auto Center</h2>
         
          
          </div>
          <div className="header__nav">
            <div>
              {name && (
                <div>
                  <IoMdContact className="header__icon" />
                  <span className="header__name">{name}</span>
                </div>
              )}
            </div>
            <div className="header__btnWrapper">
              <Button color="primary" size="sm" className="header__btn" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
