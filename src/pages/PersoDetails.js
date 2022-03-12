import "./PersoDetails.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const PersoDetails = () => {
  return (
    <div className="perso-details wrapper">
      <Header type="steps" step="three" />
      <div>
        <h3>INFORMATIONS PERSONNELLES</h3>
        <div>
          <i className="ico-radio" /> <p>M.</p>
          <i className="ico-radio" /> <p>Mme</p>
        </div>
        <input type="text" placeholder="Société" />
        <div>
          <input type="text" placeholder="Prénom *" />
          <input type="text" placeholder="Nom de famille *" />
        </div>
        <div>
          <input type="text" placeholder="Adresse Mail*" />
          <input type="text" placeholder="Numéro de téléphone *" />
        </div>
        <div>
          <input type="text" placeholder="Rue *" />
          <div>
            <input type="text" placeholder="Code postal *" />
            <input type="text" placeholder="Ville *" />
          </div>
        </div>
        <input type="text" placeholder="Pays" />
        <div>
          <p>DATE DE NAISSANCE</p>
          <div></div> <input type="number" placeholder="JJ *" />
          <input type="number" placeholder="MM *" />
          <input type="number" placeholder="AAAA *" />
        </div>
      </div>

      <div>
        <h3>VERIFIER ET RESERVER</h3>
      </div>
      <button className="reservation">RESERVER</button>

      <Link to="/">
        <button> Home</button>
      </Link>
    </div>
  );
};

export default PersoDetails;
