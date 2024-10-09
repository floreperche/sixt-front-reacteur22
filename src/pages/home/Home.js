import "./Home.css";
import map from "../../assets/img/sixt-in-the-world.png";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search-bar/SearchBar";
import HomeCarousel from "../../components/home-carousel/HomeCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Imports for the carousel

const Home = ({
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
      {/* Header */}
      <Header type="home" />
      {/* Subtitle with transportation types */}
      <div className="transportation-type">
        <button className="selected">VOITURES</button>
        <button>UTILITAIRES</button>
      </div>

      {/* Search bar */}
      <SearchBar
        type="with-button"
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
      <HomeCarousel />

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
