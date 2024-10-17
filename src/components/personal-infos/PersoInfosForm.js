// Component included in the PersoDetails Page : Form to fill personal informations

import DatePicker from "react-datepicker";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";

const PersoInfosForm = ({
  userData,
  setUserData,
  errorMessage,
  setErrorMessage,
}) => {
  // Parameters for birthday input
  const years = range(1900, getYear(new Date()) + 1, 1);
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

  return (
    <div className="personal-infos">
      <h2>INFORMATIONS PERSONNELLES</h2>
      {/* Error message if one or more mandatory inputs are missing */}
      {errorMessage && (
        <p className="error-message">
          {errorMessage}{" "}
          <i className="ico-close" onClick={() => setErrorMessage()} />
        </p>
      )}
      {/* Form with all the inputs */}
      <div>
        <p
          onClick={() =>
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "civility", value: "M." },
            })
          }
        >
          <i
            className={
              userData.civility === "M." ? "ico-radio-selected" : "ico-radio"
            }
          />{" "}
          M. **
        </p>

        <p
          onClick={() =>
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "civility", value: "Mme" },
            })
          }
        >
          <i
            className={
              userData.civility === "Mme" ? "ico-radio-selected" : "ico-radio"
            }
          />{" "}
          Mme **
        </p>
      </div>
      <input
        type="text"
        placeholder="Société"
        onChange={(event) => {
          setUserData({
            type: "UPDATE_VALUE",
            payload: { key: "society", value: event.target.value },
          });
        }}
      />
      <div className="perso-input">
        <input
          type="text"
          placeholder="Prénom *"
          onChange={(event) => {
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "firstName", value: event.target.value },
            });
          }}
        />
        <input
          type="text"
          placeholder="Nom de famille *"
          onChange={(event) => {
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "lastName", value: event.target.value },
            });
          }}
        />
      </div>
      <div className="perso-input">
        <input
          type="email"
          placeholder="Adresse Mail*"
          onChange={(event) => {
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "email", value: event.target.value },
            });
          }}
        />
        <input
          type="text"
          placeholder="Numéro de téléphone *"
          onChange={(event) => {
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "phoneNumber", value: event.target.value },
            });
          }}
        />
      </div>
      <div className="perso-input">
        <input
          type="text"
          placeholder="Rue *"
          onChange={(event) => {
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "street", value: event.target.value },
            });
          }}
        />
        <div>
          <input
            type="text"
            placeholder="Code postal *"
            onChange={(event) => {
              setUserData({
                type: "UPDATE_VALUE",
                payload: { key: "postalCode", value: event.target.value },
              });
            }}
          />
          <input
            type="text"
            placeholder="Ville *"
            onChange={(event) => {
              setUserData({
                type: "UPDATE_VALUE",
                payload: { key: "city", value: event.target.value },
              });
            }}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Pays *"
        onChange={(event) => {
          setUserData({
            type: "UPDATE_VALUE",
            payload: { key: "country", value: event.target.value },
          });
        }}
      />
      <div className="birthday">
        <p>DATE DE NAISSANCE</p>
        {/* Input for birthday with year and month picker */}
        <DatePicker
          className="birthday"
          selected={userData.birthday}
          onChange={(event) =>
            setUserData({
              type: "UPDATE_VALUE",
              payload: { key: "birthday", value: event.target.value },
            })
          }
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
  );
};

export default PersoInfosForm;
