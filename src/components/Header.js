import "./Header.css";
import logo from "../assets/img/sixt-logo.png";
import { Link } from "react-router-dom";

// Header for all pages
const Header = ({ type, step }) => {
  return (
    <header className="wrapper">
      {/* Header left with logo */}
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="logo Sixt" />
        </Link>

        {type === "home" && (
          <>
            <button className="selected">RENT</button>
            <button>SHARE</button>
            <button>RIDE</button>
            <button>
              SIXT+ <span>ABONNEMENT AUTO</span>
            </button>
          </>
        )}
      </div>

      {type === "steps" && (
        <div className="step-follower">
          <div
            className={
              (step === "one" || step === "two" || step === "three") &&
              "selected"
            }
          >
            <span>1</span> SELECTION DES VEHICULES
          </div>
          <div className={(step === "two" || step === "three") && "selected"}>
            <span>2</span> PROTECTION ET OPTIONS
          </div>
          <div className={step === "three" && "selected"}>
            <span>3</span> CONDUCTEUR
          </div>
        </div>
      )}

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
