import Header from "../components/Header";
import Loading from "../components/Loading";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const checkPassword = async () => {
    setErrorMessage("");
    if (passwordInput) {
      try {
        const response = await axios.get(
          `https://flore-perche-sixt.herokuapp.com/backoffice?input=${passwordInput}`
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
    setIsLoading(true);
    if (isConnected) {
      const fetchData = async () => {
        try {
          const newBookingList = [];
          const response = await axios.get(
            "https://flore-perche-sixt.herokuapp.com/booking/read"
          );
          for (let i = 0; i < response.data.length; i++) {
            newBookingList.push({
              booking_info: response.data[i].booking_info,
              client_info: response.data[i].client_info,
              booking_modal: false,
              id: response.data[i]._id,
            });
          }
          setBookingList(newBookingList);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, [isConnected, isDeleted]);

  const fetchModal = (goal, index) => {
    const newBookingList = [...bookingList];
    if (goal === "open") {
      newBookingList[index].booking_modal = true;
    } else {
      newBookingList[index].booking_modal = false;
    }
    setBookingList(newBookingList);
  };

  const toDelete = async (id) => {
    setIsDeleted(false);
    if (id) {
      const response = await axios.get(
        `https://flore-perche-sixt.herokuapp.com/booking/delete?id=${id}`
      );
      if (response.data) {
        setIsDeleted(true);
      }
      try {
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return isConnected ? (
    <div className="wrapper">
      <Header
        type="home"
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="admin-connected">
          <h2>Vous avez {bookingList.length} réservation(s) !</h2>
          <div className="booking-tab">
            {bookingList.map((elem, index) => {
              return (
                <>
                  <div
                    className="booking-elem"
                    key={elem.booking_info.booking_id}
                  >
                    <i
                      className="ico-info"
                      onClick={() => {
                        fetchModal("open", index);
                      }}
                    />
                    {elem.booking_info.booking_date && (
                      <p className="date">
                        {format(
                          new Date(elem.booking_info.booking_date),
                          "dd/MM/yyyy"
                        )}
                      </p>
                    )}
                    {elem.booking_info.booking_id && (
                      <p className="booking-id">
                        {elem.booking_info.booking_id}
                      </p>
                    )}
                    {elem.booking_info.car_short_name && (
                      <p className="car-name">
                        {elem.booking_info.car_short_name}
                      </p>
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
                    <button
                      className="delete"
                      onClick={() => toDelete(elem.id)}
                    >
                      SUPPRIMER
                    </button>
                  </div>
                  {/* Modal with details */}
                  {elem.booking_modal && (
                    <div className="price-modal-background">
                      <div className=" price-modal-window">
                        <i
                          className="ico-close"
                          onClick={() => {
                            fetchModal("close", index);
                          }}
                        />
                        <div className="price-subdivision">
                          <h3>{elem.booking_info.car_short_name}</h3>
                          <p>{elem.booking_info.car_long_name}</p>
                          <p>{elem.booking_info.car_agency_name}</p>
                          <p>
                            {format(
                              new Date(elem.booking_info.booking_start),
                              "dd LLL HH:mm",
                              { locale: fr }
                            )}{" "}
                            -{" "}
                            {format(
                              new Date(elem.booking_info.booking_return),
                              "dd LLL HH:mm",
                              { locale: fr }
                            )}
                          </p>
                          <img
                            src={elem.booking_info.car_picture}
                            alt="car booked"
                          />
                        </div>
                        <div className="price-subdivision">
                          <h3>PERIODE DE LOCATION</h3>
                          <div>
                            <p>
                              Durée de location (
                              {elem.booking_info.booking_duration} jour(s) x{" "}
                              {
                                elem.booking_info.car_price_details
                                  .car_day_price
                              }
                              )
                            </p>
                            <p className="price">
                              €{" "}
                              {elem.booking_info.car_price_details.car_location_price.toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="price-subdivision">
                          <h3>PROTECTIONS ET OPTIONS</h3>
                          {elem.booking_info.car_price_details.car_selected_additional_charges.map(
                            (protecAndOptions) => {
                              return (
                                <div>
                                  <p>{protecAndOptions.title}</p>
                                  <p className="price">
                                    € {protecAndOptions.totalPrice}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>

                        <div className="price-subdivision">
                          <h3>FRAIS</h3>
                          {elem.booking_info.car_price_details.car_extra_fees.map(
                            (extraFees) => {
                              return (
                                <div>
                                  <p>{extraFees.title}</p>
                                  <p className="price">
                                    € {extraFees.price.amount.toFixed(2)}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>

                        <div className="car-modal-total">
                          <h3>TOTAL</h3>
                          <p>
                            €{" "}
                            <span>{elem.booking_info.booking_total_price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
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
