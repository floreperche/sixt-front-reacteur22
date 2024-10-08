// Pages
import Home from "./pages/home/Home";
import Offers from "./pages/offers/Offers";
import Configuration from "./pages/configuration/Configuration";
import PersoDetails from "./pages/personal-details/PersoDetails";
import Admin from "./pages/admin/Admin";
import Footer from "./components/Footer";
import Error from "./pages/error-page/Error";

// Other imports
import { useState } from "react";
import "./App.css";
import "./assets/icons/icons.css";
import "./assets/fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // UseStates common to many routes
  const [selectedAgency, setSelectedAgency] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();
  const [selectedCar, setSelectedCar] = useState();

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <Home
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
            />
          }
        ></Route>
        {/* Offers Route */}
        <Route
          path="/offerlist"
          element={
            <Offers
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
              setSelectedCar={setSelectedCar}
            />
          }
        ></Route>
        {/* Configuration Route */}
        <Route
          path="/offerconfig"
          element={
            <Configuration
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
            />
          }
        ></Route>
        {/* PersoDetails Route */}
        <Route
          path="/personaldetails"
          element={
            <PersoDetails
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numberOfDays={numberOfDays}
              setNumberOfDays={setNumberOfDays}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
            />
          }
        ></Route>
        {/* Admin Route */}
        <Route path="/admin" element={<Admin />}></Route>
        {/* All Routes > redirecting Home */}
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
