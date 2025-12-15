import React from 'react';
import './Footer.css';
import { FaInstagram, FaGithub, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="global-footer">
      <p>© 2025 Aayudhara | Empowering Lives Through Donation ❤️</p>
      <div className="footer-icons">
        <a href="mailto:aayudhara.mmmut@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope title="Email" />
        </a>
        <a href="https://www.instagram.com/akarsh_pathak_08" target="_blank" rel="noopener noreferrer">
          <FaInstagram title="Instagram" />
        </a>
        <a href="tel:+917906015931" title="Phone">
          <FaPhone />
        </a>
        <a href="https://github.com/HimaniRajput-2003" target="_blank" rel="noopener noreferrer">
          <FaGithub title="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
