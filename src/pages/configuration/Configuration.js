import "./Configuration.css";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search-bar/SearchBar";
import CarDescription from "../../components/car-description/CarDescription.js";
import BookingConfiguration from "../../components/booking-configuration/BookingConfiguration.js";
import { useContext } from "react";
import { SelectedCarContext } from "../../provider/app-provider.js";

const Configuration = () => {
  const { selectedCar } = useContext(SelectedCarContext);

  return (
    <div className="config wrapper">
      {/* Header */}
      <Header type="steps" step="two" />
      {/* Search bar */}
      <SearchBar type="without-button" />
      {/* Intro with image */}
      <div className="intro-car">
        <img src={selectedCar.carDetails.splashImages[0]} alt="" />
        <h3>{selectedCar.name} </h3>
      </div>

      {/* Subtitle with car spec */}
      <CarDescription />

      {/* Car details with options to select, price and action button */}
      <BookingConfiguration />
    </div>
  );
};

export default Configuration;
