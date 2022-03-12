import "./Configuration.css";
import { Link } from "react-router-dom";

const Configuration = () => {
  return (
    <div>
      Configuration Component{" "}
      <Link to="/personaldetails">
        <button> Personal details</button>
      </Link>
    </div>
  );
};

export default Configuration;
