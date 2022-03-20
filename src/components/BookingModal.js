// Component included in the connected version of Admin page with booking details

import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BookingModal = ({ elem, fetchModal, index }) => {
  return (
    elem.booking_modal && (
      <div className="price-modal-background">
        <div className=" price-modal-window">
          <i
            className="ico-close"
            onClick={() => {
              fetchModal("close", index);
            }}
          />
          {/* Introduction */}
          <div className="intro-booking-modal">
            <div>
              <h3>{elem.booking_info.car_short_name}</h3>
              <p>{elem.booking_info.car_long_name}</p>
              <p>{elem.booking_info.car_agency_name}</p>
              <p>
                {format(
                  new Date(elem.booking_info.booking_start),
                  "dd LLL HH:mm",
                  { locale: fr }
                )}{" "}
                -{" "}
                {format(
                  new Date(elem.booking_info.booking_return),
                  "dd LLL HH:mm",
                  { locale: fr }
                )}
              </p>
              <p>Contact client : {elem.client_info.client_email}</p>
            </div>

            <img src={elem.booking_info.car_picture} alt="car booked" />
          </div>
          {/* Price details */}
          <div className="price-subdivision">
            <h3>PERIODE DE LOCATION</h3>
            <div>
              <p>
                Durée de location ({elem.booking_info.booking_duration} jour(s)
                x €{" "}
                {elem.booking_info.car_price_details.car_location_price_by_day})
              </p>
              <p className="price">
                €{" "}
                {elem.booking_info.car_price_details.car_location_price.toFixed(
                  2
                )}
              </p>
            </div>
          </div>
          <div className="price-subdivision">
            <h3>PROTECTIONS ET OPTIONS</h3>
            {elem.booking_info.car_price_details.car_selected_additional_charges.map(
              (protecAndOptions, optionIndex) => {
                return (
                  <div key={optionIndex}>
                    <p>{protecAndOptions.title}</p>
                    <p className="price">€ {protecAndOptions.totalPrice}</p>
                  </div>
                );
              }
            )}
          </div>

          <div className="price-subdivision">
            <h3>FRAIS</h3>
            {elem.booking_info.car_price_details.car_extra_fees.map(
              (extraFees, feesIndex) => {
                return (
                  <div key={feesIndex}>
                    <p>{extraFees.title}</p>
                    <p className="price">
                      € {extraFees.price.amount.toFixed(2)}
                    </p>
                  </div>
                );
              }
            )}
          </div>
          {/* Total */}
          <div className="car-modal-total">
            <h3>TOTAL</h3>
            <p>
              € <span>{elem.booking_info.booking_total_price}</span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default BookingModal;
