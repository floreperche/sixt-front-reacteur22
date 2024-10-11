import { useState, createContext } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedAgency, setSelectedAgency] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();
  const [selectedCar, setSelectedCar] = useState();

  return (
    <BookingContext.Provider
      value={{
        selectedAgency: selectedAgency,
        setSelectedAgency: setSelectedAgency,
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        numberOfDays: numberOfDays,
        setNumberOfDays: setNumberOfDays,
        selectedCar: selectedCar,
        setSelectedCar: setSelectedCar,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
