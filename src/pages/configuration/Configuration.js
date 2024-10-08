import "./Configuration.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search-bar/SearchBar";
import PriceDetailsModal from "../../components/price-details/PriceDetailsModal";
import OptionsCarousel from "../../components/options/OptionsCarousel";
import CarDescription from "../../components/car-description/CarDescription.js";

const Configuration = ({
  selectedAgency,
  setSelectedAgency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  numberOfDays,
  setNumberOfDays,
  selectedCar,
  setSelectedCar,
}) => {
  const [toReload, setToReload] = useState(false);

  // Function to calcule prices (total price, total price and price by day without fees)
  const priceCalcul = (result) => {
    let totalPriceCalcul = numberOfDays * selectedCar.price;
    // Total price
    if (result === "total") {
      for (
        let i = 0;
        i < selectedCar.carDetails.additionalCharges.length;
        i++
      ) {
        if (selectedCar.carDetails.additionalCharges[i].amount === 1) {
          if (
            selectedCar.carDetails.additionalCharges[i].price.unit === "jour" ||
            selectedCar.carDetails.additionalCharges[i].price.unit ===
              "jour/unité"
          ) {
            totalPriceCalcul +=
              selectedCar.carDetails.additionalCharges[i].price.amount *
              numberOfDays;
          } else {
            totalPriceCalcul +=
              selectedCar.carDetails.additionalCharges[i].price.amount;
          }
        }
      }
      return totalPriceCalcul.toFixed(2);
    } else {
      // Total price and price by day without fees
      let fees = 0;
      for (let j = 0; j < selectedCar.carDetails.extraFees.length; j++) {
        fees += selectedCar.carDetails.extraFees[j].price.amount;
      }
      if (result === "totalWithoutFees") {
        return (totalPriceCalcul - fees).toFixed(2);
      } else if (result === "byDayWithoutFees") {
        return ((totalPriceCalcul - fees) / numberOfDays).toFixed(2);
      } else {
        return;
      }
    }
  };

  return (
    <div className="config wrapper">
      {/* Header */}
      <Header type="steps" step="two" />
      {/* Search bar */}
      <SearchBar
        type="without-button"
        selectedAgency={selectedAgency}
        setSelectedAgency={setSelectedAgency}
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
      <div className="car-details">
        <div className="details-left">
          <h2>CHOISSISSEZ VOTRE PROTECTION ET VOS OPTIONS</h2>
          <div>
            {/* (Dynamic) summary of options */}
            <h3>VOTRE OFFRE INCLUT</h3>
            <div className="included-list">
              {selectedCar.carDetails.includedCharges.map(
                (includedCharges, index) => {
                  return (
                    <p key={index}>
                      <i className="ico-bullet-sm" /> {includedCharges.title}
                    </p>
                  );
                }
              )}
              {selectedCar.carDetails.additionalCharges.map((elem, index) => {
                // console.log("elem >", elem);
                return (
                  elem.amount === 1 && (
                    <p key={index}>
                      <i className="ico-bullet-sm" /> {elem.title}
                    </p>
                  )
                );
              })}
            </div>
          </div>

          {/* Option selection */}
          <div>
            <h3>CHOISISSEZ VOS OPTIONS</h3>
            <OptionsCarousel
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setToReload={setToReload}
              toReload={toReload}
            />
          </div>
        </div>

        {/* Price and button */}
        <div className="details-right">
          <div>
            <p className="black">TOTAL</p>
            <p className="price-value">
              € <span>{priceCalcul("total")}</span>
            </p>
          </div>
          <div>
            {/* Price details modal */}
            <PriceDetailsModal
              numberOfDays={numberOfDays}
              selectedCar={selectedCar}
              priceCalcul={priceCalcul}
            />
            <p>Taxes incluses</p>
          </div>

          {/* Link to personal details Page with memorization in the selectedCar value of user choices to avoid mapping options in the next screens : creation of TotalPrice, locationPrice, locationPriceByDay and selectedAdditionalCharges */}
          <Link to="/personaldetails" onClick={() => window.scrollTo(0, 0)}>
            <button
              onClick={() => {
                let newSelectedCar = selectedCar;
                newSelectedCar.totalPrice = Number(priceCalcul("total"));
                newSelectedCar.locationPrice = Number(
                  priceCalcul("totalWithoutFees")
                );
                newSelectedCar.locationPriceByDay = Number(
                  priceCalcul("byDayWithoutFees")
                );
                const selectedOptions = [];
                const options = newSelectedCar.carDetails.additionalCharges;
                for (let i = 0; i < options.length; i++) {
                  if (options[i].amount === 1) {
                    if (
                      options[i].price.unit === "jour" ||
                      options[i].price.unit === "jour/unité"
                    ) {
                      selectedOptions.push({
                        title: options[i].title,
                        totalPrice: (
                          options[i].price.amount * numberOfDays
                        ).toFixed(2),
                      });
                    } else {
                      selectedOptions.push({
                        title: options[i].title,
                        totalPrice: options[i].price.amount.toFixed(2),
                      });
                    }
                  }
                }
                newSelectedCar.selectedAdditionalCharges = selectedOptions;
              }}
            >
              CONTINUER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
