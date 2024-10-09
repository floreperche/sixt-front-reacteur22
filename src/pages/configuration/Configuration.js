import "./Configuration.css";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search-bar/SearchBar";
import CarDescription from "../../components/car-description/CarDescription.js";
import BookingConfiguration from "../../components/booking-configuration/BookingConfiguration.js";

const Configuration = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  numberOfDays,
  setNumberOfDays,
  selectedCar,
  setSelectedCar,
}) => {
  return (
    <div className="config wrapper">
      {/* Header */}
      <Header type="steps" step="two" />
      {/* Search bar */}
      <SearchBar
        type="without-button"
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        numberOfDays={numberOfDays}
        setNumberOfDays={setNumberOfDays}
      />
      {/* Intro with image */}
      <div className="intro-car">
        <img src={selectedCar.carDetails.splashImages[0]} alt="" />
        <h3>{selectedCar.name} </h3>
      </div>

      {/* Subtitle with car spec */}
      <CarDescription selectedCar={selectedCar} />

      {/* Car details with options to select, price and action button */}
      <BookingConfiguration
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        numberOfDays={numberOfDays}
      />
    </div>
  );
};

export default Configuration;
