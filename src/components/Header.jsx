import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

import clickNpost from "../assets/clickNpost.png";
import "./Header.css";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Album",
    path: "/album",
  },
  {
    name: "Digital Album",
    path: "/digital-album",
  },
  {
    name: "Instagram Work",
    path: "/instagram",
  },
  {
    name: "Testimonials",
    path: "/testimonials",
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const openWhatsApp = () => {
    const message =
      "Hi Click N Post Studio! I'm interested in booking your wedding photography services. Please share your packages and availability.";

    const whatsappUrl = `https://wa.me/919555609461?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    closeMenu();
  };

  return (
    <>
      <header className="navBar">
        <NavLink
          to="/"
          className="logoContainer"
          onClick={closeMenu}
          aria-label="Click N Post home"
        >
          <img
            src={clickNpost}
            alt="Click N Post Logo"
            className="header-logo"
          />
        </NavLink>

        <div className="desktopNav">
          <ul className="lists">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "activeLink" : ""
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="bookBtn"
            onClick={openWhatsApp}
          >
            Book Now
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu"
          onClick={() => setShowMenu(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={30} />
        </button>
      </header>

      <aside
        className={`mobileSidebar ${showMenu ? "showSidebar" : ""}`}
        aria-hidden={!showMenu}
      >
        <div className="sidebarTop">
          <NavLink to="/" onClick={closeMenu}>
            <img
              src={clickNpost}
              alt="Click N Post logo"
              className="mobileLogo"
            />
          </NavLink>

          <button
            type="button"
            className="closeIcon"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="mobileLinks">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "activeMobileLink" : ""
              }
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="mobileSocials">
          <a
            href="https://instagram.com/clicknpost_filmphotography"
            target="_blank"
            rel="noreferrer"
            aria-label="Click N Post Instagram"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Click N Post Facebook"
          >
            <FaFacebookF size={22} />
          </a>
        </div>

        <button
          type="button"
          className="mobileBookBtn"
          onClick={openWhatsApp}
        >
          Book A Session
        </button>
      </aside>

      {showMenu && (
        <button
          type="button"
          className="backdrop"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}
    </>
  );
};

export default Header;