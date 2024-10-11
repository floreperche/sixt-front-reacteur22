import "./CarDescription.css";
import { useContext } from "react";
import { BookingContext } from "../../provider/booking-provider";

const CarDescription = () => {
  const { selectedCar } = useContext(BookingContext);
  return (
    <div className="car-subtitles">
      <p>{selectedCar.longSubline}</p>
      <div>
        <div>
          <i className="ico-maxPassengers" /> {selectedCar.seats} sièges
        </div>
        <div>
          <i className="ico-doors" /> {selectedCar.doors} portes
        </div>
        <div>
          <i className="ico-automatic" />{" "}
          {selectedCar.automatic ? <>Automatique</> : <>Manuelle</>}
        </div>
        <div>
          <i className="ico-baggage" /> {selectedCar.baggage} bagages
        </div>
        {selectedCar.airCondition && (
          <div>
            <i className="ico-airCondition" /> Climatisation
          </div>
        )}

        <div>
          <i className="ico-driverRequirements" /> {selectedCar.driverMinAge}{" "}
          ans
        </div>
      </div>
    </div>
  );
};

export default CarDescription;
