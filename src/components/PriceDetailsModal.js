import { useState } from "react";

const PriceDetailsModal = ({ numberOfDays, selectedCar, priceCalcul }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <i className="ico-chevron-right" /> Details du prix
      </p>
      {isOpen && (
        <div className="price-modal-background">
          <div className="price-modal-window">
            <i
              className="ico-close"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <h2>DETAILS DU PRIX</h2>
            <div className="price-subdivision">
              <h3>PERIODE DE LOCATION</h3>
              <div>
                <p>
                  Durée de location ({numberOfDays} jour(s) x{" "}
                  {selectedCar.price})
                </p>
                <p className="price">
                  € {(numberOfDays * selectedCar.price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="price-subdivision">
              <h3>PROTECTIONS ET OPTIONS</h3>
              {selectedCar.carDetails.additionalCharges.map(
                (protecAndOptions) => {
                  return (
                    protecAndOptions.amount === 1 && (
                      <div>
                        <p>{protecAndOptions.title}</p>
                        <p className="price">
                          €{" "}
                          {protecAndOptions.price.unit === "jour" ||
                          protecAndOptions.price.unit === "jour/unité"
                            ? (
                                protecAndOptions.price.amount * numberOfDays
                              ).toFixed(2)
                            : protecAndOptions.price.amount.toFixed(2)}
                        </p>
                      </div>
                    )
                  );
                }
              )}
            </div>

            <div className="price-subdivision">
              <h3>FRAIS</h3>
              {selectedCar.carDetails.extraFees.map((extraFees) => {
                return (
                  <div>
                    <p>{extraFees.title}</p>
                    <p className="price">
                      € {extraFees.price.amount.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="car-modal-total">
              <h3>TOTAL</h3>
              <p>
                € <span>{priceCalcul()}</span>
              </p>
            </div>
            <p>Taxes incluses</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceDetailsModal;
