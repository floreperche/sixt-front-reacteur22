// Component included in the Offer page : button to filter cars according to their type

import { useState } from "react";

const CarFilter = ({ typeFilter, setTypeFilter, setIsLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="car-filter">
      {/* Button to open filters */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={isOpen ? "action-button selected" : "action-button"}
      >
        <p>CATEGORIE DE VEHICULE</p> <i className=" ico-chevron-down" />{" "}
      </button>
      {/* List of all options : if one option is selected/unselected, the tab typeFilter is updated */}
      {isOpen && (
        <div className="car-filter-open">
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              newTypeFilter[0].state = !newTypeFilter[0].state;
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
            }}
          >
            <div>
              {typeFilter[0].state ? (
                <i className="ico-checkbox-checked" />
              ) : (
                <i className="ico-checkbox" />
              )}
              <p>CONVERTIBLE</p>
            </div>
            <i className="ico-convertible" />
          </button>
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              newTypeFilter[1].state = !newTypeFilter[1].state;
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
            }}
          >
            <div>
              {typeFilter[1].state ? (
                <i className="ico-checkbox-checked" />
              ) : (
                <i className="ico-checkbox" />
              )}
              <p>BERLINE</p>
            </div>
            <i className=" ico-limousine" />
          </button>
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              newTypeFilter[2].state = !newTypeFilter[2].state;
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
            }}
          >
            <div>
              {typeFilter[2].state ? (
                <i className="ico-checkbox-checked" />
              ) : (
                <i className="ico-checkbox" />
              )}
              <p>SUV</p>
            </div>

            <i className="ico-off-road" />
          </button>
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              newTypeFilter[3].state = !newTypeFilter[3].state;
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
            }}
          >
            <div>
              {typeFilter[3].state ? (
                <i className="ico-checkbox-checked" />
              ) : (
                <i className="ico-checkbox" />
              )}
              <p>COUPE</p>
            </div>

            <i className="ico-coupe" />
          </button>
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              newTypeFilter[4].state = !newTypeFilter[4].state;
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
            }}
          >
            <div>
              {typeFilter[4].state ? (
                <i className="ico-checkbox-checked" />
              ) : (
                <i className="ico-checkbox" />
              )}
              <p>PICKUP</p>
            </div>

            <i className=" ico-pickup" />
          </button>
          {/* Reset button */}
          <button
            onClick={() => {
              const newTypeFilter = [...typeFilter];
              for (let i = 0; i < newTypeFilter.length; i++) {
                newTypeFilter[i].state = false;
              }
              setTypeFilter(newTypeFilter);
              setIsLoading(true);
              setIsOpen(false);
            }}
            className="reset-button"
          >
            REINITIALISER
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default CarFilter;
