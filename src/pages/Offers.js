import "./Offers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Offers = ({
  selectedAgency,
  setSelectedAgency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  numberOfDays,
  setNumberOfDays,
}) => {
  const [offerList, setOfferList] = useState([]);
  console.log(offerList);
  useEffect(() => {
    try {
      console.log(selectedAgency);
      if (selectedAgency && startDate && endDate) {
        const toAdd = `?agency=${selectedAgency.id}&pickupDate=${
          startDate.toISOString().split(".")[0]
        }&returnDate=${endDate.toISOString().split(".")[0]}`;
        console.log(toAdd);
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:3003/rentaloffers${toAdd}`
          );
          setOfferList(response.data);
        };
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedAgency, startDate, endDate]);

  return (
    <div className="wrapper">
      <Header type="steps" step="one" />
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
      <div className="infos-and-filter">
        <p>
          <span>{offerList.length}</span> OFFRES
        </p>
        <button>
          <p>CATEGORIE DE VEHICULE</p> <i className=" ico-chevron-down" />{" "}
        </button>
      </div>
      <div className="car-list">
        {offerList.map((elem) => {
          const totalPrice = (
            elem.prices.dayPrice.amount * numberOfDays
          ).toFixed(2);
          return (
            <div className="car-card" key={elem.id}>
              <p className="car-name">{elem.headlines.description}</p>
              <p>{elem.headlines.longSubline}</p>
              <img src={elem.images.small} alt="car" />
              <p>
                <i className="ico-bullet-sm" /> illimité miles incl.
              </p>
              <p className="basket day">
                € <span>{elem.prices.dayPrice.amount}</span> | jour
              </p>
              <p className="basket total">€ {totalPrice} total</p>
            </div>
          );
        })}

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
