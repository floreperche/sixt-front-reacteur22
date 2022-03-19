import Header from "../components/Header";
import Loading from "../components/Loading";
import BookingModal from "../components/BookingModal";
import { useState, useEffect } from "react";
import "./Admin.css";
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

  // Query to check if the password is correct
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

  // Keeping the admin session open is there is a cookie
  useEffect(() => {
    const cookieCheck = Cookies.get("password");
    if (cookieCheck) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, []);

  // Query to get the list of booking in the database
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

  // Function to open/close the modal with booking details
  const fetchModal = (goal, index) => {
    const newBookingList = [...bookingList];
    if (goal === "open") {
      newBookingList[index].booking_modal = true;
    } else {
      newBookingList[index].booking_modal = false;
    }
    setBookingList(newBookingList);
  };

  // Function to delete a booking
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
    // When connected : booking list
    <div className="wrapper">
      {/* Header */}
      <Header
        type="home"
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      {isLoading ? (
        <Loading />
      ) : (
        // Booking tab
        <div className="admin-connected">
          {bookingList.length > 0 ? (
            <h2>
              Vous avez <span>{bookingList.length}</span> réservation(s) !
            </h2>
          ) : (
            <h2>Vous n'avez pas de réservation</h2>
          )}

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
                  <BookingModal elem={elem} fetchModal={fetchModal} />
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  ) : (
    // When disconnected : connection form
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
