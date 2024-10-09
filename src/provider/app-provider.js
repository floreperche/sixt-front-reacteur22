import { useState, createContext } from "react";

export const SelectedAgencyContext = createContext();
export const StartDateContext = createContext();
export const EndDateContext = createContext();
export const NumberOfDaysContext = createContext();
export const SelectedCarContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedAgency, setSelectedAgency] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();
  const [selectedCar, setSelectedCar] = useState();

  return (
    <SelectedAgencyContext.Provider
      value={{
        selectedAgency: selectedAgency,
        setSelectedAgency: setSelectedAgency,
      }}
    >
      <StartDateContext.Provider
        value={{
          startDate: startDate,
          setStartDate: setStartDate,
        }}
      >
        <EndDateContext.Provider
          value={{
            endDate: endDate,
            setEndDate: setEndDate,
          }}
        >
          <NumberOfDaysContext.Provider
            value={{
              numberOfDays: numberOfDays,
              setNumberOfDays: setNumberOfDays,
            }}
          >
            <SelectedCarContext.Provider
              value={{
                selectedCar: selectedCar,
                setSelectedCar: setSelectedCar,
              }}
            ></SelectedCarContext.Provider>
            {children}
          </NumberOfDaysContext.Provider>
        </EndDateContext.Provider>
      </StartDateContext.Provider>
    </SelectedAgencyContext.Provider>
  );
};
