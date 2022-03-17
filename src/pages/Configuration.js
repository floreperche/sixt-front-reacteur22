import "./Configuration.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PriceDetailsModal from "../components/PriceDetailsModal";
import OptionsCarousel from "../components/OptionsCarousel";

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

  const priceCalcul = () => {
    let totalPriceCalcul = numberOfDays * selectedCar.price;
    for (let i = 0; i < selectedCar.carDetails.additionalCharges.length; i++) {
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
    for (let j = 0; j < selectedCar.carDetails.extraFees.length; j++) {
      totalPriceCalcul += selectedCar.carDetails.extraFees[j].price.amount;
    }
    return totalPriceCalcul.toFixed(2);
  };

  return (
    <div className="config wrapper">
      <Header type="steps" step="two" />
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
      <div className="intro-car">
        <img src={selectedCar.carDetails.splashImages[0]} alt="" />
        <h3>{selectedCar.name} </h3>
      </div>
      <div className="car-subtitles">
        <p>{selectedCar.longSubline}</p>
        <div>
          <div>
            <i className="ico-maxPassengers" /> {selectedCar.seats} sièges
          </div>
          <div>
            <i className="ico-doors" /> {selectedCar.doors} portes
          </div>
          <div>
            <i className="ico-automatic" />{" "}
            {selectedCar.automatic ? <>Automatique</> : <>Manuelle</>}
          </div>
          <div>
            <i className="ico-baggage" /> {selectedCar.baggage} bagages
          </div>
          {selectedCar.airCondition && (
            <div>
              <i className="ico-airCondition" /> Climatisation
            </div>
          )}

          <div>
            <i className="ico-driverRequirements" /> {selectedCar.driverMinAge}{" "}
            ans
          </div>
        </div>
      </div>
      <div className="car-details">
        <div className="details-left">
          <h2>CHOISSISSEZ VOTRE PROTECTION ET VOS OPTIONS</h2>
          <div>
            <h3>VOTRE OFFRE INCLUT</h3>
            <div className="included-list">
              {selectedCar.carDetails.includedCharges.map((includedCharges) => {
                return (
                  <p>
                    <i className="ico-bullet-sm" /> {includedCharges.title}
                  </p>
                );
              })}
              {selectedCar.carDetails.additionalCharges.map((elem) => {
                // console.log("elem >", elem);
                return (
                  elem.amount === 1 && (
                    <p>
                      <i className="ico-bullet-sm" /> {elem.title}
                    </p>
                  )
                );
              })}
            </div>
          </div>

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
        <div className="details-right">
          <div>
            <p className="black">TOTAL</p>
            <p className="price-value">
              € <span>{priceCalcul()}</span>
            </p>
          </div>
          <div>
            <PriceDetailsModal
              numberOfDays={numberOfDays}
              selectedCar={selectedCar}
              priceCalcul={priceCalcul}
            />
            <p>Taxes incluses</p>
          </div>

          <Link to="/personaldetails" onClick={() => window.scrollTo(0, 0)}>
            <button
              onClick={() => {
                let newSelectedCar = selectedCar;
                newSelectedCar.totalPrice = Number(priceCalcul());
                newSelectedCar.locationPrice = Number(
                  (numberOfDays * selectedCar.price).toFixed(2)
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
