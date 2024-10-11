// Component included in the Offer page : Modal when the user clicks on a car

import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useContext } from "react";
import { BookingContext } from "../../provider/booking-provider";

const CarModal = ({ elem, resultsList, index, setOfferList, totalPrice }) => {
  const { setSelectedCar } = useContext(BookingContext);

  return (
    <div className="car-modal-background">
      <div className=" wrapper car-modal">
        {/* LEFT : Carousel with infos */}
        <div className="carousel-car-wrapper">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop="true"
            autoPlay="true"
          >
            {elem.carDetails.splashImages.map((carImg) => {
              return (
                <div key={elem.id}>
                  <img src={carImg} alt="car details" />
                </div>
              );
            })}
          </Carousel>
          <div className="carousel-car-infos">
            <h2>{elem.name}</h2>
            <div className="carousel-car-details">
              <div>
                <i className="ico-maxPassengers" /> {elem.seats} sièges
              </div>
              <div>
                <i className="ico-doors" /> {elem.doors} portes
              </div>
              <div>
                <i className="ico-automatic" />{" "}
                {elem.automatic ? <>Automatique</> : <>Manuelle</>}
              </div>
              <div>
                <i className="ico-baggage" /> {elem.baggage} bagages
              </div>
              {elem.airCondition && (
                <div>
                  <i className="ico-airCondition" /> Climatisation
                </div>
              )}

              <div>
                <i className="ico-driverRequirements" /> {elem.driverMinAge} ans
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT : Price and action button */}
        <div className="car-modal-right">
          <i
            className="ico-close"
            onClick={() => {
              const newResultsList = [...resultsList];
              newResultsList[index].carModal = false;
              setOfferList(newResultsList);
            }}
          />
          <div className="car-modal-bottom">
            <div className="price-div">
              <p>TOTAL</p>
              <p className="price">
                € <span>{totalPrice}</span>{" "}
              </p>
            </div>
            <p>Taxes incluses</p>
            <Link to="/offerconfig" onClick={() => window.scrollTo(0, 0)}>
              <button
                onClick={() => {
                  setSelectedCar(elem);
                }}
              >
                {" "}
                SELECTIONNER
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
