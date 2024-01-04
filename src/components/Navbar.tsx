import Link from "next/link";
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
            <Link href="/">
              <a>MojPGD</a>
            </Link>
          </span>
        </div>
        <ul className="nav-links">
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/clani">
              <a>Člani</a>
            </Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/oprema">
              <a>Oprema</a>
            </Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/finance">
              <a>Finance</a>
            </Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/voznje">
              <a>Vožnje</a>
            </Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/intervencije">
              <a>Intervencije</a>
            </Link>
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
