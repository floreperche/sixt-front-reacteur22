import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home Component{" "}
      <Link to="/offerlist">
        <button> Offers</button>
      </Link>
    </div>
  );
};

export default Home;
