import { useState, createContext } from "react";

export const SelectedAgencyContext = createContext();

export const SelectedAgencyProvider = ({ children }) => {
  const [selectedAgency, setSelectedAgency] = useState();
  return (
    <SelectedAgencyContext.Provider
      value={{
        selectedAgency: selectedAgency,
        setSelectedAgency: setSelectedAgency,
      }}
    >
      {children}
    </SelectedAgencyContext.Provider>
  );
};
