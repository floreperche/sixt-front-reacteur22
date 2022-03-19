import DatePicker from "react-datepicker";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";

const PersoInfosForm = ({
  errorMessage,
  setErrorMessage,
  setCivility,
  civility,
  setSociety,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setStreet,
  setPostalCode,
  setCity,
  setCountry,
  birthday,
  setBirthday,
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
      {errorMessage && (
        <p className="error-message">
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
            className={civility === "Mme" ? "ico-radio-selected" : "ico-radio"}
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
          type="email"
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
        placeholder="Pays *"
        onChange={(event) => {
          setCountry(event.target.value);
        }}
      />
      <div className="birthday">
        <p>DATE DE NAISSANCE</p>
        {/* Input for birthday with year and month picker */}
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
  );
};

export default PersoInfosForm;
