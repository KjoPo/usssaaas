import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './USPSMenu.css';
const USPSMenu = () => {
  return (
    <header className="usps-header">
      <div className="usps-header-container">
      <img 
          src="/images/logo-sb.jpg" 
          alt="USPS Logo" 
          className="logo"
          style={{ height: '20px', marginBottom: '10px' }}
        />
        <nav className="usps-nav">
          <ul className="usps-nav-list">
            <li className="usps-nav-item quick-tools-wrapper">
              <a href="#" className="usps-nav-link quick-tools-link">Quick Tools</a>
              <div className="red-strip"></div>
            </li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Mail & Ship</a></li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Track & Manage</a></li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Postal Store</a></li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Business</a></li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Informational</a></li>
            <li className="usps-nav-item"><a href="#" className="usps-nav-link">Help</a></li>
            <li className="usps-nav-item search-icon-item">
              <FiSearch className="search-icon" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default USPSMenu;