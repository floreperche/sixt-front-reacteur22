import { useState } from "react";

const OptionsCarousel = ({
  selectedCar,
  setSelectedCar,
  setToReload,
  toReload,
}) => {
  const [extendOptions, setExtendOptions] = useState(false);

  return (
    <div className="options-carousel">
      {selectedCar.carDetails.additionalCharges.map((addCharge, index) => {
        return (
          ((extendOptions === false && index < 5) || extendOptions) && (
            <div
              onClick={() => {
                if (addCharge.price.amount > 0) {
                  let newSelectedCar = selectedCar;
                  if (addCharge.amount === 0) {
                    if (addCharge.id === "I3") {
                      newSelectedCar.carDetails.additionalCharges[
                        newSelectedCar.carDetails.additionalCharges.findIndex(
                          (item) => item.id === "I4"
                        )
                      ].amount = 0;
                    } else if (addCharge.id === "I4") {
                      newSelectedCar.carDetails.additionalCharges[
                        newSelectedCar.carDetails.additionalCharges.findIndex(
                          (item) => item.id === "I3"
                        )
                      ].amount = 0;
                    }
                    newSelectedCar.carDetails.additionalCharges[
                      index
                    ].amount = 1;
                  } else if (addCharge.amount === 1) {
                    newSelectedCar.carDetails.additionalCharges[
                      index
                    ].amount = 0;
                  }
                  setSelectedCar(newSelectedCar);
                }
                setToReload(!toReload);
              }}
              className={
                addCharge.amount === 1
                  ? "options-card selected"
                  : "options-card unselected"
              }
            >
              {" "}
              <i className={addCharge.icon} />
              <div>
                <h3>{addCharge.title} </h3>
                {addCharge.description && <p>{addCharge.description} </p>}

                {addCharge.price.amount > 0 ? (
                  <p className="price">
                    € <span>{addCharge.price.amount.toFixed(2)}</span>{" "}
                    {addCharge.price.unit}
                  </p>
                ) : (
                  <p>
                    <i className="ico-bullet-sm" /> Inclus dans le prix
                  </p>
                )}
              </div>
            </div>
          )
        );
      })}
      {extendOptions === false ? (
        <div
          className="options-card see-more"
          onClick={() => setExtendOptions(true)}
        >
          <i className="ico-plus-sign" /> <p>Voir plus d'options</p>
        </div>
      ) : (
        <div
          className="options-card see-more"
          onClick={() => setExtendOptions(false)}
        >
          <i className="ico-minus-sign" /> <p>Voir moins d'options</p>
        </div>
      )}
    </div>
  );
};

export default OptionsCarousel;
