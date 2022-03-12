import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      Admin Component{" "}
      <Link to="/">
        <button> Home</button>
      </Link>
    </div>
  );
};

export default Admin;
