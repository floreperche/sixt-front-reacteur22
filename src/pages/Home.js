import "./Home.css";
import map from "../assets/img/sixt-in-the-world.png";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Imports for the carousel
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../assets/img/carousel/carousel-1.jpeg";
import carousel2 from "../assets/img/carousel/carousel-2.jpeg";
import carousel3 from "../assets/img/carousel/carousel-3.jpeg";

const Home = () => {
  return (
    <div className="wrapper">
      {/* Subtitle with transportation types */}
      <div className="transportation-type">
        <button>VOITURES</button>
        <button>UTILITAIRES</button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <div>
          <p>Retrait et retour</p>
          <input></input>
        </div>
        <div>
          <p>Date de départ</p>
          <div>Date et heure</div>
        </div>
        <div>
          <p>Date de retour</p>
          <div>Date et heure</div>
        </div>
        <Link to="/offerlist">
          <button> Offers</button>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop="true"
        autoPlay="true"
      >
        <div>
          <img src={carousel1} />
        </div>
        <div>
          <img src={carousel2} />
        </div>
        <div>
          <img src={carousel3} />
        </div>
      </Carousel>

      {/* Rest of Home Page :  Map + App and social media infos */}
      <div className="map">
        <h2>LES AGENCES SIXT DANS LE MONDE</h2>
        <div>
          <img src={map} alt="sixt in the world" />
          <button>TROUVER L'AGENCE</button>
        </div>
      </div>
      <div className="app-and-social">
        <p>TELECHARGEZ L'APP SIXT</p>
        <div>
          <button>
            <i className="ico-apple-logo" />
          </button>
          <button>
            <i className="ico-google-logo" />
          </button>
        </div>
        <p>SUIVEZ-NOUS</p>
        <div>
          <i className="ico-fb-logo" />
          <i className="ico-twitter-logo" />
          <i className="ico-instagram-logo" />
          <i className="ico-youtube-logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
