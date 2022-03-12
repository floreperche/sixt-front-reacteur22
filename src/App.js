import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Configuration from "./pages/Configuration";
import PersoDetails from "./pages/PersoDetails";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import "./assets/icons/icons.css";
import "./assets/fonts/stylesheet.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offerlist" element={<Offers />}></Route>
        <Route path="/offerconfig" element={<Configuration />}></Route>
        <Route path="/personaldetails" element={<PersoDetails />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
