import React from 'react';
import './Footer.css';
import { Snowflake } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Snowflake className="footer-icon" />
            <span className="logo-text">FunIce</span>
          </div>
          <p className="footer-desc">
            Comerț cu ridicata nespecializat și echipamente frigorifice sau de brutărie premium. 
            Înființată în 1996 în București.
          </p>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} FunIce SRL. Toate drepturile rezervate.</p>
          <div className="footer-links">
            <span>București</span>
            <span className="dot">•</span>
            <span>Oradea</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
