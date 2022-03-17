import Header from "../components/Header";
import { useState, useEffect } from "react";
import "./Admin.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Admin = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingList, setBookingList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const checkPassword = async () => {
    setErrorMessage("");
    if (passwordInput) {
      try {
        const response = await axios.get(
          `http://localhost:3003/backoffice?input=${passwordInput}`
        );
        if (response.data.message.includes("incorrect")) {
          setErrorMessage("Le mot de passe saisi est incorrect");
        } else {
          setIsConnected(true);
          Cookies.set("password", passwordInput);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrorMessage("Veuillez saisir un mot de passe");
    }
  };

  useEffect(() => {
    const cookieCheck = Cookies.get("password");
    if (cookieCheck) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3003/booking/read"
          );
          setBookingList(response.data);
          // console.log(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, [isConnected]);

  return isConnected ? (
    <div className="wrapper">
      <Header
        type="home"
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <div className="admin-connected">
        <h2>Vous avez {bookingList.length} réservation(s) !</h2>
        <div className="booking-tab">
          {bookingList.map((elem) => {
            return (
              <div className="booking-elem">
                {elem.booking_info.booking_date && (
                  <p className="date">
                    {format(
                      new Date(elem.booking_info.booking_date),
                      "dd/MM/yyyy"
                    )}
                  </p>
                )}
                {elem.booking_info.booking_id && (
                  <p className="booking-id">{elem.booking_info.booking_id}</p>
                )}
                {elem.booking_info.car_short_name && (
                  <p className="car-name">{elem.booking_info.car_short_name}</p>
                )}
                <div className="booking-date">
                  {elem.booking_info.booking_start && (
                    <p>
                      {format(
                        new Date(elem.booking_info.booking_start),
                        "dd LLL HH:mm",
                        { locale: fr }
                      )}
                    </p>
                  )}
                  {elem.booking_info.booking_return && (
                    <p>
                      {format(
                        new Date(elem.booking_info.booking_return),
                        "dd LLL HH:mm",
                        { locale: fr }
                      )}
                    </p>
                  )}
                </div>
                <div className="client-name">
                  {elem.client_info.client_lastname && (
                    <p>{elem.client_info.client_lastname}</p>
                  )}
                  {elem.client_info.client_firstname && (
                    <p>{elem.client_info.client_firstname}</p>
                  )}
                </div>

                {elem.booking_info.booking_total_price && (
                  <p className="price">
                    {elem.booking_info.booking_total_price} €
                  </p>
                )}
                <i className="ico-close" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="wrapper">
      <Header type="home" />
      <div className="admin-login">
        <h2>🗝️ Connexion au BackOffice</h2>
        <div className="admin-login-child">
          <p>Mot de passe</p>
          <input
            type="password"
            onChange={(elem) => setPasswordInput(elem.target.value)}
          ></input>
          <button onClick={checkPassword}>SE CONNECTER</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
