import "./Offers.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Offers = () => {
  return (
    <div className="wrapper">
      <Header type="steps" step="one" />
      <SearchBar type="without-button" />
      <div className="infos-and-filter">
        <p>
          <span>xx</span> OFFRES
        </p>
        <button>
          <p>CATEGORIE DE VEHICULE</p> <i className=" ico-chevron-down" />{" "}
        </button>
      </div>
      <div className="car-list">
        <div className="car-card">
          <p className="car-name">NOM VOITURE</p>
          <p>ou similaire | xxxxx</p>
          <div className="picture"></div>
          <p>
            <i className="ico-bullet-sm" /> illimité miles incl.
          </p>
          <p className="basket day">
            € <span>122</span>,48 | jour
          </p>
          <p className="basket total">€ 1975,43 total</p>
        </div>

        <div className="car-card"></div>
        <div className="car-card"></div>
        <div className="car-card"></div>
        <div className="car-card"></div>
        <div className="car-card"></div>
        <div className="car-card"></div>
        <div className="car-card"></div>
      </div>

      <Link to="/offerconfig">
        <button> Configuration</button>
      </Link>
    </div>
  );
};

export default Offers;
