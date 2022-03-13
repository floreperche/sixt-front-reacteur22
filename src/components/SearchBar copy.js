import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBar.css";
import { registerLocale } from "react-datepicker";
registerLocale("fr", fr);

const SearchBar = ({
  type,
  selectedAgency,
  setSelectedAgency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  testData,
  setTestData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [agencyList, setAgencyList] = useState([]);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  var minTime = new Date();
  minTime.setMinutes(0);
  minTime.setHours(8);

  var maxTime = new Date();
  maxTime.setMinutes(0);
  maxTime.setHours(18);

  useEffect(() => {
    try {
      if (searchText.length >= 3) {
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:3003/agencies?search=${searchText}`
          );
          setAgencyList(response.data);
        };
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [searchText]);

  useEffect(() => {
    if (startDate) {
      if (startDate.getHours() > 0) {
        setStartTime(true);
      }
    }
    if (endDate) {
      if (endDate.getHours() > 0) {
        setEndTime(true);
      }
    }
  }, [startDate, endDate]);

  // Search bar from Home Page (with button)
  return (
    <div>
      <div className="search-bar">
        <div className="search-text">
          <p>Retrait et retour</p>

          <div className="agency-search">
            <i className="ico-search"></i>
            <input
              onChange={(elem) => {
                setTestData(elem.target.value);
              }}
              value={testData}
            ></input>{" "}
            <p>test data : {testData}</p>
            <Link to="/offerlist">
              <button>Offers</button>
            </Link>
            <input
              onChange={(elem) => {
                setSelectedAgency();
                setSearchText(elem.target.value);
                if (elem.target.value.length < 3) {
                  setAgencyList([]);
                }
              }}
              value={selectedAgency ? selectedAgency.title : searchText}
            ></input>
          </div>

          {agencyList.length > 0 && (
            <div className="agency-box">
              {agencyList.map((elem) => {
                return (
                  <p
                    key={elem.id}
                    onClick={() => {
                      setSelectedAgency(elem);
                      setAgencyList([]);
                    }}
                  >
                    {elem.title.includes("Airport") ||
                    elem.title.includes("AP") ? (
                      <i className="ico-plane" />
                    ) : (
                      <i className="ico-agency" />
                    )}
                    {elem.title}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <div className="start-date">
          <p>Date et heure de départ</p>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="fr"
              dateFormat={
                startDate && startDate.getHours() === 0
                  ? "d MMM"
                  : "d MMM - kk:mm"
              }
              maxDate={endDate}
              minDate={Date.now()}
              showTimeSelect
              minTime={minTime}
              maxTime={maxTime}
              timeCaption="HEURE"
            />
          </div>
        </div>
        <div className="end-date">
          <p>Date et heure de retour</p>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              locale="fr"
              dateFormat={
                endDate && endDate.getHours() === 0 ? "d MMM" : "d MMM - kk:mm"
              }
              minDate={startDate}
              showTimeSelect
              minTime={minTime}
              maxTime={maxTime}
              timeFormat="HH:mm"
              timeCaption="HEURE"
            />
          </div>
        </div>
        {type === "with-button" && (
          <div>
            {selectedAgency && startDate && endDate && startTime && endTime ? (
              <Link to="/offerlist">
                <button className="result-button"> VOIR LES OFFRES</button>
              </Link>
            ) : (
              <div>
                <button
                  className="result-button unselected"
                  onClick={() => {
                    setErrorMessage(
                      "Au moins l'un des champs semble manquant. Assurez vous d'avoir notamment renseigné un horaire de départ et d'arrivée"
                    );
                  }}
                >
                  VOIR LES OFFRES
                </button>
              </div>
            )}
          </div>
        )}

        {/* {type === "with-button" && ()} */}
      </div>
      <div className="error-message">
        {errorMessage}{" "}
        {errorMessage && (
          <i className="ico-close" onClick={() => setErrorMessage()} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
