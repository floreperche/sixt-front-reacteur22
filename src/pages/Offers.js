import "./Offers.css";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div>
      Offers Component{" "}
      <Link to="/offerconfig">
        <button> Configuration</button>
      </Link>
    </div>
  );
};

export default Offers;
