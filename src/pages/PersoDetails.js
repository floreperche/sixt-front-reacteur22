import "./PersoDetails.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
// import { formatDistanceStrict } from "date-fns";
registerLocale("fr", fr);

const PersoDetails = ({
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
  // console.log(selectedCar);
  // console.log(selectedAgency);

  const [civility, setCivility] = useState("");
  const [society, setSociety] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthday] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState();

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        street &&
        postalCode &&
        city &&
        birthday
      ) {
        const response = await axios.post(
          `http://localhost:3003/booking/create`,
          {
            civility: civility,
            society: society,
            firstname: firstName,
            lastname: lastName,
            email: email,
            phonenumber: phoneNumber,
            birthday: birthday,
            street: street,
            postalcode: postalCode,
            city: city,
            country: country,
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
            included_charges: selectedCar.carDetails.includedCharges,
            extra_fees: selectedCar.carDetails.extraFees,
            additional_charges: selectedCar.selectedAdditionalCharges,
            total_price: selectedCar.totalPrice,
          }
        );
        console.log(response.data);
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

      <div className="personal-infos">
        <h2>INFORMATIONS PERSONNELLES</h2>
        {errorMessage && (
          <p>
            {errorMessage}{" "}
            <i className="ico-close" onClick={() => setErrorMessage()} />
          </p>
        )}
        <div>
          <p onClick={() => setCivility("M.")}>
            <i
              className={civility === "M." ? "ico-radio-selected" : "ico-radio"}
            />{" "}
            M. **
          </p>

          <p onClick={() => setCivility("Mme")}>
            <i
              className={
                civility === "Mme" ? "ico-radio-selected" : "ico-radio"
              }
            />{" "}
            Mme **
          </p>
        </div>
        <input
          type="text"
          placeholder="Société"
          onChange={(event) => {
            setSociety(event.target.value);
          }}
        />
        <div className="perso-input">
          <input
            type="text"
            placeholder="Prénom *"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Nom de famille *"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="perso-input">
          <input
            type="text"
            placeholder="Adresse Mail*"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Numéro de téléphone *"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
        <div className="perso-input">
          <input
            type="text"
            placeholder="Rue *"
            onChange={(event) => {
              setStreet(event.target.value);
            }}
          />
          <div>
            <input
              type="text"
              placeholder="Code postal *"
              onChange={(event) => {
                setPostalCode(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Ville *"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Pays"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <div className="birthday">
          <p>DATE DE NAISSANCE</p>
          <DatePicker
            className="birthday"
            selected={birthday}
            onChange={(event) => setBirthday(event)}
            locale="fr"
            dateFormat="d MMM yyyy"
            maxDate={Date.now()}
            placeholderText="Date de naissance *"
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
          />
        </div>
      </div>

      <div className="booking-recap">
        <h2>VERIFIER ET RESERVER</h2>
        <div className="price-subdivision">
          <h3>VOTRE OFFRE INCLUT</h3>
          <div className="included-list-recap">
            {selectedCar.carDetails.includedCharges.map((includedCharges) => {
              return (
                <p>
                  <i className="ico-bullet-sm" /> {includedCharges.title}
                </p>
              );
            })}
            {selectedCar.selectedAdditionalCharges.map((elem) => {
              return (
                <p>
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
              Durée de location ({numberOfDays} jour(s) x {selectedCar.price})
            </p>
            <p className="price">
              € {(numberOfDays * selectedCar.price).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="price-subdivision">
          <h3>PROTECTIONS ET OPTIONS</h3>
          {selectedCar.selectedAdditionalCharges.map((protecAndOptions) => {
            // console.log(protecAndOptions);
            return (
              <div>
                <p>{protecAndOptions.title}</p>
                <p className="price"> € {protecAndOptions.totalPrice}</p>
              </div>
            );
          })}
        </div>
        <div className="price-subdivision">
          <h3>FRAIS</h3>
          {selectedCar.carDetails.extraFees.map((extraFees) => {
            return (
              <div>
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
      {isConfirmed && (
        <div className="confirmation-modal-background">
          <div className="confirmation-modal-window">
            <Link to="/">
              <i
                className="ico-close confirmation-close"
                onClick={() => {
                  setSelectedAgency();
                  setStartDate();
                  setEndDate();
                  setNumberOfDays();
                  setSelectedCar();
                  setCivility();
                  setSociety();
                  setFirstName();
                  setLastName();
                  setEmail();
                  setPhoneNumber();
                  setStreet();
                  setPostalCode();
                  setCity();
                  setCountry();
                  setBirthday();
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
