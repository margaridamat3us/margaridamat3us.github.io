import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-box">
          <h3>Social</h3>
          <div className="social">
            <a href="https://www.instagram.com/__tom_._/">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="https://www.tiktok.com/@idiotiquetom?lang=pt-BR">
              <i className="ri-tiktok-fill"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
