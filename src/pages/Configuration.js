import "./Configuration.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import tesla from "../assets/img/tesla.jpg";

const Configuration = () => {
  return (
    <div className="config wrapper">
      <Header type="steps" step="two" />
      <SearchBar type="without-button" />
      <div className="intro-car">
        <img src={tesla} alt="" />
        <h3>TESLA MODEL </h3>
      </div>
      <div className="car-subtitles">
        <p>TESLA, LA MEILLEURE VOITURE ?</p>
        <div>
          <div>
            <i className="ico-maxPassengers" />5 sièges
          </div>
          <div>
            <i className="ico-doors" />4 portes
          </div>
          <div>
            <i className="ico-automatic" />
            Automatique
          </div>
          <div>
            <i className="ico-baggage" />2 bagages
          </div>
          <div>
            <i className="ico-airCondition" />
            Climatisation
          </div>
          <div>
            <i className="ico-driverRequirements" />
            21 ans
          </div>
        </div>
      </div>
      <div className="car-details">
        <div className="details-left">
          <h3>CHOISSISSEZ VOTRE PROTECTION ET VOS OPTIONS</h3>
          <p>VOTRE OFFRE INCLUT</p>
          <p>CHOISISSEZ VOS OPTIONS</p>
          <div className="options-carousel">
            <div className="options-card">
              <div>
                <i className="ico-carshield" />
                <p>PROTEGEZ VOTRE LOCATION</p>
              </div>
              <p>Protection vol et collision USD 0 de franchise</p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-charges" />
                <p>PEAGE EXPRESS ILLIMITE</p>
              </div>
              <p>
                Choisissez la voie rapide avec une nutilisation illimitée des
                voes de péage automatisées pour un prix fixe
              </p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-wifi" />
                <p>SIXT CONNECT PLUS</p>
              </div>
              <p>
                Restez connecté 24h/24 et 7j/7 avec le Wi-Fi et 60 minutes
                d'appels gratuits pour un maximum de 5 appareils
              </p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-satnav" />
                <p>SYSTEME DE NAVIGATION GARANTI</p>
              </div>
              <p>Trouvez le meilleur itinétaire avec le GPS</p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-refill" />
                <p>VEHICULE PRIS RESERVOIR PLEIN - RETOUR A VIDE</p>
              </div>
              <p>
                SIXT fait le plein pour vous, une fois le véhicule rendu, à un
                tarif fixe
              </p>
            </div>
            <div className="options-card">
              <div>
                <i className=" ico-wifi" />
                <p>SIXT CONNECT</p>
              </div>
              <p>
                Restez connecté 24h/24 et 7j/7 avec le Wi-Fi pour un maximum de
                5 appareils
              </p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-personplusbig" />
                <p>CONDUCTEUR SUPPLEMENTAIRE</p>
              </div>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-mailinvoice" />
                <p>ENVOI FACTURE PAR COURIER</p>
              </div>
              <p>Recevez votre facture par la poste</p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-sixt-logo-sm" />
                <p>PARKING PASS UNLIMITED</p>
              </div>
              <p>
                Plus de confort grâce à l'accès aux aires de stationnement et
                aux garages du réseau Way
              </p>
            </div>
            <div className="options-card">
              <div>
                <i className="ico-childseat" />
                <p>SIEGES BEBE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="details-right">
          <div>
            <p>TOTAL</p>
            <p>
              € <span>1797</span>,41
            </p>
          </div>
          <div>
            <p>
              <i className="ico-chevron-right" /> Details du prix
            </p>
            <p>Taxes incluses</p>
          </div>
          <Link to="/personaldetails">
            <button> Personal details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
