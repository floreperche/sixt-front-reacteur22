import "./PersoDetails.css";
import { useState, useContext, useReducer } from "react";
import { BookingContext } from "../../provider/booking-provider";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import PersoInfosForm from "../../components/personal-infos/PersoInfosForm";
import { fr } from "date-fns/locale/";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
registerLocale("fr", fr);

const PersoDetails = () => {
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "UPDATE_VALUE":
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      case "CLEAN_VALUES":
        return {
          initialState,
        };
      default:
        return state;
    }
  };

  const initialState = {
    civility: "",
    society: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    birthday: "",
  };

  const [userData, setUserData] = useReducer(reducerFn, initialState);

  const [errorMessage, setErrorMessage] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState();
  const {
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
  } = useContext(BookingContext);

  // Function when the form is submited to save the booking into the database (if a check of the mandatory inputs)
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        userData.firstName &&
        userData.lastName &&
        userData.email &&
        userData.phoneNumber &&
        userData.street &&
        userData.postalCode &&
        userData.city &&
        userData.birthday
      ) {
        const response = await axios.post(
          `https://flore-perche-sixt.herokuapp.com/booking/create`,
          {
            civility: userData.civility,
            society: userData.society,
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            phonenumber: userData.phoneNumber,
            birthday: userData.birthday,
            street: userData.street,
            postalcode: userData.postalCode,
            city: userData.city,
            country: userData.country,
            booking_start: startDate,
            booking_return: endDate,
            booking_duration: numberOfDays,
            agency_id: selectedAgency.id,
            agency_name: selectedAgency.title,
            car_id: selectedCar.id,
            car_short_name: selectedCar.name,
            car_long_name: selectedCar.longSubline,
            car_picture: selectedCar.smallImage,
            driver_min_age: selectedCar.driverMinAge,
            day_price: selectedCar.price,
            location_price: selectedCar.locationPrice,
            location_price_by_day: selectedCar.locationPriceByDay,
            included_charges: selectedCar.carDetails.includedCharges,
            extra_fees: selectedCar.carDetails.extraFees,
            additional_charges: selectedCar.selectedAdditionalCharges,
            total_price: selectedCar.totalPrice,
          }
        );
        setBookingId(response.data.bookingId);
        setIsConfirmed(true);
      } else {
        console.log("info manquante");
        setErrorMessage("Au moins un champ obligatoire (*) est manquant");
      }
    } catch (error) {
      console.log("error.message : ", error.message);
    }
  };

  return (
    <div className="perso-details wrapper">
      <Header type="steps" step="three" />

      {/* Personal informations form */}
      <PersoInfosForm
        userData={userData}
        setUserData={setUserData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* Booking recap */}
      <div className="booking-recap">
        <h2>VERIFIER ET RESERVER</h2>
        <div className="price-subdivision">
          <h3>VOTRE OFFRE INCLUT</h3>
          <div className="included-list-recap">
            {selectedCar.carDetails.includedCharges.map(
              (includedCharges, index) => {
                return (
                  <p key={index}>
                    <i className="ico-bullet-sm" /> {includedCharges.title}
                  </p>
                );
              }
            )}
            {selectedCar.selectedAdditionalCharges.map((elem, index) => {
              return (
                <p key={index}>
                  <i className="ico-bullet-sm" /> {elem.title}
                </p>
              );
            })}
          </div>
        </div>
        <div className="price-subdivision">
          <h3>EXIGENCES POUR LES CONDUCTEURS</h3>
          <div>Conducteur âgé d'au moins {selectedCar.driverMinAge} ans</div>
        </div>
        <div className="price-subdivision">
          <h3>PERIODE DE LOCATION</h3>
          <div>
            <p>
              Durée de location ({numberOfDays} jour(s) x €{" "}
              {selectedCar.locationPriceByDay})
            </p>
            <p className="price">€ {selectedCar.locationPrice}</p>
          </div>
        </div>
        <div className="price-subdivision">
          <h3>PROTECTIONS ET OPTIONS</h3>
          {selectedCar.selectedAdditionalCharges.map(
            (protecAndOptions, index) => {
              return (
                <div key={index}>
                  <p>{protecAndOptions.title}</p>
                  <p className="price"> € {protecAndOptions.totalPrice}</p>
                </div>
              );
            }
          )}
        </div>
        <div className="price-subdivision">
          <h3>FRAIS</h3>
          {selectedCar.carDetails.extraFees.map((extraFees, index) => {
            return (
              <div key={index}>
                <p>{extraFees.title}</p>
                <p className="price">€ {extraFees.price.amount.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div>
          <div className="booking-recap-total">
            <h3>TOTAL</h3>
            <p className="price">
              {" "}
              € <span>{selectedCar.totalPrice}</span>
            </p>
          </div>
          <p className="right">Taxes incluses</p>
        </div>
      </div>

      {/* Confirmation with button action */}
      <div className="go-booking">
        <p>
          En cliquant sur le bouton, je confirme que j'ai lu et accepté les{" "}
          <span>informations de location</span> et les{" "}
          <span>termes et conditions</span>
        </p>
        <button className="reservation" onClick={handleSubmit}>
          RESERVER
        </button>
      </div>

      {/* Modal with the confirmation message and the booking ID */}
      {isConfirmed && (
        <div className="confirmation-modal-background">
          <div className="confirmation-modal-window">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <i
                className="ico-close confirmation-close"
                onClick={() => {
                  setSelectedAgency();
                  setStartDate();
                  setEndDate();
                  setNumberOfDays();
                  setSelectedCar();
                  setUserData({
                    type: "CLEAN_VALUES",
                  });
                  setErrorMessage();
                  setIsConfirmed();
                }}
              />
            </Link>

            <h3>RESERVATION CONFIRMEE</h3>
            <div>
              <p>Voici la référence de votre dossier : </p>
              <span>{bookingId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersoDetails;
