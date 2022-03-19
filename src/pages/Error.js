import Header from "../components/Header";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <Header type="home" />{" "}
      <div className="error-button">
        {" "}
        <Link to="/">
          <button>RETOURNER A LA PAGE D'ACCUEIL</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
