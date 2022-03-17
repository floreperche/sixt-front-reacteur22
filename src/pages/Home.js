import "./Home.css";
import map from "../assets/img/sixt-in-the-world.png";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// Imports for the carousel
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../assets/img/carousel/carousel-1.jpeg";
import carousel2 from "../assets/img/carousel/carousel-2.jpeg";
import carousel3 from "../assets/img/carousel/carousel-3.jpeg";

const Home = ({
  selectedAgency,
  setSelectedAgency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  testData,
  setTestData,
  numberOfDays,
  setNumberOfDays,
}) => {
  return (
    <div className="wrapper">
      <Header type="home" />
      {/* Subtitle with transportation types */}
      <div className="transportation-type">
        <button className="selected">VOITURES</button>
        <button>UTILITAIRES</button>
      </div>

      {/* Search bar */}
      <SearchBar
        type="with-button"
        selectedAgency={selectedAgency}
        setSelectedAgency={setSelectedAgency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        testData={testData}
        setTestData={setTestData}
        numberOfDays={numberOfDays}
        setNumberOfDays={setNumberOfDays}
      />

      {/* Carousel */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop="true"
        autoPlay="true"
      >
        <div>
          <img src={carousel1} alt="first carousel" />
        </div>
        <div>
          <img src={carousel2} alt="second carousel" />
        </div>
        <div>
          <img src={carousel3} alt="third carousel" />
        </div>
      </Carousel>

      {/* Rest of Home Page :  Map + App and social media infos */}
      <div className="map">
        <p>Les agences SIXT dans le monde</p>
        <div>
          <img src={map} alt="sixt in the world" />
          <button>TROUVER L'AGENCE</button>
        </div>
      </div>
      <div className="app-and-social">
        <p>TELECHARGEZ L'APP SIXT</p>
        <div className="app-download">
          <button>
            <i className="ico-apple-logo" />
          </button>
          <button>
            <i className="ico-google-logo" />
          </button>
        </div>
        <p>SUIVEZ-NOUS</p>
        <div className="social-medias">
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
