import React from "react";
import AuthShowcase from "./AuthShowcase";
import LogoImg from "~/assets/img/logo.png";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="navbar-container backdrop-blur-sm">
        <div className="logo-container">
          <Image
            src={LogoImg}
            height={80}
            alt="Logo"
            className="my-2 ml-2"
          ></Image>
          <span className="logo">
            <a href="./">MojPGD</a>
          </span>
        </div>
        <ul className="nav-links">
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <a href="/clani">Člani</a>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <a href="/oprema">Oprema</a>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <a href="/finance">Finance</a>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <a href="/voznje">Vožnje</a>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <a href="/intervencije">Intervencije</a>
          </li>
        </ul>
        <div className="sign-up">
          <AuthShowcase />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
