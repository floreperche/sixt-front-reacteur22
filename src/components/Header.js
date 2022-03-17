import "./Header.css";
import logo from "../assets/img/sixt-logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Header for all pages
const Header = ({ type, step, isConnected, setIsConnected }) => {
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
      <div>
        <Link to="/admin">
          <button>
            <i className="ico-planet"></i> BACKOFFICE
          </button>
        </Link>
        {isConnected && (
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <button
              className="log-out"
              onClick={() => {
                setIsConnected(false);
                Cookies.remove("password");
              }}
            >
              SE DECONNECTER
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
