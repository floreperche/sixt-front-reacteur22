import { useContext } from "react";
import CarModal from "../car/CarModal";
import { BookingContext } from "../../provider/booking-provider";

const CarList = ({ resultsList, setOfferList }) => {
  const { numberOfDays } = useContext(BookingContext);
  return (
    <div className="car-list">
      {resultsList.map((elem, index) => {
        let totalPrice = 0;
        totalPrice = (elem.price * numberOfDays).toFixed(2);
        const dayPriceWithExtraFees = (totalPrice / numberOfDays).toFixed(2);

        return (
          <>
            {/* Car card on the list of results */}
            <div
              className="car-card"
              key={elem.id}
              onClick={() => {
                const newResultsList = [...resultsList];
                newResultsList[index].carModal = true;
                setOfferList(newResultsList);
              }}
            >
              <p className="car-name">{elem.name}</p>
              <p>{elem.subline}</p>
              <img src={elem.smallImage} alt="car" />
              <p>
                <i className="ico-bullet-sm" /> {elem.mileageInfo}
              </p>
              <p className="basket day">
                € <span>{dayPriceWithExtraFees}</span> | jour
              </p>
              <p className="basket total">€ {totalPrice} total</p>
            </div>
            {/* Car modal */}
            {elem.carModal && (
              <CarModal
                elem={elem}
                resultsList={resultsList}
                index={index}
                setOfferList={setOfferList}
                totalPrice={totalPrice}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default CarList;
