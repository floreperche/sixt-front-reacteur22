// Pages
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Configuration from "./pages/Configuration";
import PersoDetails from "./pages/PersoDetails";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

// Other imports
import { useState } from "react";
import "./App.css";
import "./assets/icons/icons.css";
import "./assets/fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [selectedAgency, setSelectedAgency] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState();

  return (
    <Router>
      <Routes>
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
            />
          }
        ></Route>
        <Route path="/offerconfig" element={<Configuration />}></Route>
        <Route path="/personaldetails" element={<PersoDetails />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
