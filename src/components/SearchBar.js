import { Link } from "react-router-dom";

const SearchBar = ({ type }) => {
  return type === "with-button" ? (
    <div className="search-bar">
      <div className="search-text">
        <p>Retrait et retour</p>
        <div>
          <i class="ico-search"></i>
          <input></input>
        </div>
      </div>
      <div className="start-date">
        <p>Date de départ</p>
        <div>
          <div>Date</div>
          <div>Heure</div>
        </div>
      </div>
      <div className="end-date">
        <p>Date de retour</p>
        <div>
          <div>Date</div>
          <div>Heure</div>
        </div>
      </div>
      <Link to="/offerlist">
        <button className="result-button"> VOIR LES OFFRES</button>
      </Link>
    </div>
  ) : (
    <div className="search-bar">
      <div className="search-text">
        <p>Retrait et retour</p>
        <div>
          <i class="ico-search"></i>
          <input></input>
        </div>
      </div>
      <div className="start-date">
        <p>Date de départ</p>
        <div>
          <div>Date</div>
          <div>Heure</div>
        </div>
      </div>
      <div className="end-date">
        <p>Date de retour</p>
        <div>
          <div>Date</div>
          <div>Heure</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
