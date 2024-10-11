// Pages
import Home from "./pages/home/Home";
import Offers from "./pages/offers/Offers";
import Configuration from "./pages/configuration/Configuration";
import PersoDetails from "./pages/personal-details/PersoDetails";
import Admin from "./pages/admin/Admin";
import Footer from "./components/footer/Footer";
import Error from "./pages/error-page/Error";

// Other imports
import "./App.css";
import "./assets/icons/icons.css";
import "./assets/fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./provider/booking-provider";

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />}></Route>
          {/* Offers Route */}
          <Route path="/offerlist" element={<Offers />}></Route>
          {/* Configuration Route */}
          <Route path="/offerconfig" element={<Configuration />}></Route>
          {/* PersoDetails Route */}
          <Route path="/personaldetails" element={<PersoDetails />}></Route>
          {/* Admin Route */}
          <Route path="/admin" element={<Admin />}></Route>
          {/* All Routes > redirecting Home */}
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </BookingProvider>
  );
}

export default App;
