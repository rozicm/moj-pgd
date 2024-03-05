import Link from "next/link";
import AuthShowcase from "./AuthShowcase";
import LogoImg from "~/assets/img/logo.png";
import Image from "next/image";
// import { api } from "~/utils/api";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="navbar-container backdrop-blur-sm">
        <div className="logo-container">
          <Image
            src={LogoImg}
            height={60}
            alt="Logo"
            className="my-2 ml-2"
          ></Image>
          <span className="logo">
            <Link href="/">MojPGD</Link>
          </span>
        </div>
        <ul className="nav-links pr-20">
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/">Člani</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/oprema">Oprema</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/finance">Finance</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/voznje">Vožnje</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/intervencije">Intervencije</Link>
          </li>
          <li className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Link href="/letnoPorocilo">Letno poročilo</Link>
          </li>
        </ul>
        <div className="color-white mr-3">
          <AuthShowcase />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
