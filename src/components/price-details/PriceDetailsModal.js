// Component included in the Config Page : Modal to get the price details

import { useState, useContext } from "react";
import { BookingContext } from "../../provider/booking-provider";

const PriceDetailsModal = ({ priceCalcul }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { numberOfDays, selectedCar } = useContext(BookingContext);

  return (
    <div>
      {/* Button to open the modal */}
      <p
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <i className="ico-chevron-right" /> Details du prix
      </p>
      {/* Modal with different categories */}
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
                  Durée de location ({numberOfDays} jour(s) x €{" "}
                  {priceCalcul("byDayWithoutFees")})
                </p>
                <p className="price">€ {priceCalcul("totalWithoutFees")}</p>
              </div>
            </div>

            <div className="price-subdivision">
              <h3>PROTECTIONS ET OPTIONS</h3>
              {selectedCar.carDetails.additionalCharges.map(
                (protecAndOptions, index) => {
                  return (
                    protecAndOptions.amount === 1 && (
                      <div key={index}>
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
                € <span>{priceCalcul("total")}</span>
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
