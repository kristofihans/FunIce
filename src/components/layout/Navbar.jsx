import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Snowflake className="logo-icon" />
          <span className="logo-text">FunIce</span>
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Despre Noi
          </NavLink>
          <NavLink to="/produse" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Produse
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Contact
          </NavLink>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
