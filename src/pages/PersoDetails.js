import "./PersoDetails.css";
import { Link } from "react-router-dom";

const PersoDetails = () => {
  return (
    <div>
      PersoDetails Component{" "}
      <Link to="/">
        <button> Home</button>
      </Link>
    </div>
  );
};

export default PersoDetails;
