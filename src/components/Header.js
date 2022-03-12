import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header Component
      <Link to="/admin">
        <button> Admin</button>
      </Link>{" "}
    </div>
  );
};

export default Header;
