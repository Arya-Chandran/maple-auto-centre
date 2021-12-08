import React from "react";
import facebook from "../../assets/icons/icon-facebook.png";
import instagram from "../../assets/icons/icon-instagram.png";
import twitter from "../../assets/icons/icon-twitter.png";
import "./Footer.scss";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__main">
          <div className="footer__container1">
            <h3 className="footer__title">Follow us</h3>

            <div className="footer__imageWrapper">
              <div>
                <a href="https://www.instagram.com">
                  <img
                    className="footer__image"
                    src={instagram}
                    alt="instagram"
                  />
                </a>
              </div>

              <div>
                <a href="https://www.facebook.com">
                  <img
                    className="footer__image"
                    src={facebook}
                    alt="facebook"
                  />
                </a>
              </div>

              <div>
                <a href="https://www.twitter.com">
                  <img className="footer__image" src={twitter} alt="twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__container2">
          <p className="footer__content">
            ©2021 Maple Auto Center. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
