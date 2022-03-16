import "./Offers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import CarFilter from "../components/CarFilter";
import { Carousel } from "react-responsive-carousel";

const Offers = ({
  selectedAgency,
  setSelectedAgency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  numberOfDays,
  setNumberOfDays,
  setSelectedCar,
}) => {
  const [offerList, setOfferList] = useState([]);
  const [typeFilter, setTypeFilter] = useState([
    { name: "ico-convertible", state: false },
    { name: "ico-limousine", state: false },
    { name: "ico-off-road", state: false },
    { name: "ico--coupe", state: false },
    { name: "ico-pickup", state: false },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // console.log(selectedAgency);
      if (selectedAgency && startDate && endDate) {
        const toAdd = `?agency=${selectedAgency.id}&pickupDate=${
          startDate.toISOString().split(".")[0]
        }&returnDate=${endDate.toISOString().split(".")[0]}`;
        // console.log(toAdd);
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:3003/rentaloffers${toAdd}`
          );
          console.log(response.data);
          const newOfferList = [];
          let filterCheck = false;
          if (
            typeFilter[0].state ||
            typeFilter[1].state ||
            typeFilter[2].state ||
            typeFilter[3].state ||
            typeFilter[4].state
          ) {
            filterCheck = true;
          }
          for (let i = 0; i < response.data.length; i++) {
            // If at least
            if (filterCheck) {
              for (let j = 0; j < typeFilter.length; j++) {
                if (
                  typeFilter[j].state &&
                  response.data[i].carGroupInfo.bodyStyleIcon ===
                    typeFilter[j].name
                ) {
                  try {
                    const detailsResponse = await axios.get(
                      `http://localhost:3003/cardetails?id=${response.data[i].id}`
                    );
                    newOfferList.push({
                      id: response.data[i].id,
                      name: response.data[i].headlines.description,
                      subline: response.data[i].headlines.shortSubline,
                      longSubline: response.data[i].headlines.longSubline,
                      mileageInfo: response.data[i].headlines.mileageInfo,
                      smallImage: response.data[i].images.small,
                      price: response.data[i].prices.dayPrice.amount,
                      bodyStyle: response.data[i].carGroupInfo.bodyStyleIcon,
                      carModal: false,
                      seats: response.data[i].carGroupInfo.maxPassengers,
                      doors: response.data[i].carGroupInfo.doors,
                      automatic: response.data[i].carGroupInfo.automatic,
                      baggage: response.data[i].carGroupInfo.baggage,
                      airCondition: response.data[i].carGroupInfo.airCondition,
                      driverMinAge: response.data[i].carGroupInfo.driverMinAge,
                      carDetails: detailsResponse.data,
                    });
                  } catch (error) {
                    console.log(error.message);
                  }
                }
              }
            } else {
              try {
                const detailsResponse = await axios.get(
                  `http://localhost:3003/cardetails?id=${response.data[i].id}`
                );
                // console.log(response.data.splashImages[1]);
                newOfferList.push({
                  id: response.data[i].id,
                  name: response.data[i].headlines.description,
                  subline: response.data[i].headlines.shortSubline,
                  longSubline: response.data[i].headlines.longSubline,
                  mileageInfo: response.data[i].headlines.mileageInfo,
                  smallImage: response.data[i].images.small,
                  price: response.data[i].prices.dayPrice.amount,
                  bodyStyle: response.data[i].carGroupInfo.bodyStyleIcon,
                  carModal: false,
                  seats: response.data[i].carGroupInfo.maxPassengers,
                  doors: response.data[i].carGroupInfo.doors,
                  automatic: response.data[i].carGroupInfo.automatic,
                  baggage: response.data[i].carGroupInfo.baggage,
                  airCondition: response.data[i].carGroupInfo.airCondition,
                  driverMinAge: response.data[i].carGroupInfo.driverMinAge,
                  carDetails: detailsResponse.data,
                });
              } catch (error) {}
            }
          }
          setOfferList(newOfferList);
          setIsLoading(false);
          console.log(newOfferList);
        };
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedAgency, startDate, endDate, typeFilter]);

  return (
    <div className="wrapper">
      <Header type="steps" step="one" />
      <SearchBar
        type="without-button"
        selectedAgency={selectedAgency}
        setSelectedAgency={setSelectedAgency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        numberOfDays={numberOfDays}
        setNumberOfDays={setNumberOfDays}
      />

      <div className="infos-and-filter">
        <CarFilter
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          setIsLoading={setIsLoading}
        />
        {isLoading === false && (
          <p>
            <span>{offerList.length}</span> OFFRE(S)
          </p>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="car-list">
          {offerList.map((elem, index) => {
            let extraFeesAmount = 0;
            let totalPrice = 0;
            if (elem.carDetails.extraFees) {
              const extraFeesDetails = elem.carDetails.extraFees;
              for (let k = 0; k < extraFeesDetails.length; k++) {
                extraFeesAmount += extraFeesDetails[k].price.amount;
              }
              totalPrice = (
                elem.price * numberOfDays +
                extraFeesAmount
              ).toFixed(2);
            } else {
              totalPrice = (elem.price * numberOfDays).toFixed(2);
            }
            const dayPriceWithExtraFees = (totalPrice / numberOfDays).toFixed(
              2
            );

            return (
              <>
                <div
                  className="car-card"
                  key={elem.id}
                  onClick={() => {
                    const newOfferList = [...offerList];
                    newOfferList[index].carModal = true;
                    setOfferList(newOfferList);
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
                {elem.carModal && (
                  <div className="car-modal-background">
                    <div className=" wrapper car-modal">
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
                              <i className="ico-maxPassengers" /> {elem.seats}{" "}
                              sièges
                            </div>
                            <div>
                              <i className="ico-doors" /> {elem.doors} portes
                            </div>
                            <div>
                              <i className="ico-automatic" />{" "}
                              {elem.automatic ? (
                                <>Automatique</>
                              ) : (
                                <>Manuelle</>
                              )}
                            </div>
                            <div>
                              <i className="ico-baggage" /> {elem.baggage}{" "}
                              bagages
                            </div>
                            {elem.airCondition && (
                              <div>
                                <i className="ico-airCondition" /> Climatisation
                              </div>
                            )}

                            <div>
                              <i className="ico-driverRequirements" />{" "}
                              {elem.driverMinAge} ans
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="car-modal-right">
                        <i
                          className="ico-close"
                          onClick={() => {
                            const newOfferList = [...offerList];
                            newOfferList[index].carModal = false;
                            setOfferList(newOfferList);
                          }}
                        />
                        <div className="car-modal-bottom">
                          <div>
                            <p>TOTAL</p>
                            <p>€ {totalPrice}</p>
                          </div>
                          <p>Taxes incluses</p>
                          <Link to="/offerconfig">
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
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Offers;
