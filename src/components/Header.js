import "./Header.css";
import logo from "../assets/img/sixt-logo.png";
import { Link } from "react-router-dom";

// Header for all pages
const Header = () => {
  return (
    <header className="wrapper">
      {/* Header left with logo */}
      <div className="header-left">
        <img src={logo} alt="logo Sixt" />
        <button className="selected">RENT</button>
        <button>SHARE</button>
        <button>RIDE</button>
        <button>
          SIXT+ <span>ABONNEMENT AUTO</span>
        </button>
      </div>

      {/* Header right : Access to backoffice */}
      <Link to="/admin">
        <button>
          <i class="ico-planet"></i> BACKOFFICE
        </button>
      </Link>
    </header>
  );
};

export default Header;
