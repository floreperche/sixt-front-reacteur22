import "./Offers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import CarModal from "../components/CarModal";
import CarFilter from "../components/CarFilter";

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
  const [filteredOfferList, setFilteredOfferList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [typeFilter, setTypeFilter] = useState([
    { name: "ico-convertible", state: false },
    { name: "ico-limousine", state: false },
    { name: "ico-off-road", state: false },
    { name: "ico--coupe", state: false },
    { name: "ico-pickup", state: false },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Getting car list for an agency, start and return date (with car details)
  useEffect(() => {
    setIsLoading(true);
    setErrorMessage();
    if (selectedAgency && startDate && endDate) {
      const toAdd = `?agency=${selectedAgency.id}&pickupDate=${
        startDate.toISOString().split(".")[0]
      }&returnDate=${endDate.toISOString().split(".")[0]}`;
      const fetchData = async () => {
        try {
          // Query for the list
          const response = await axios.get(
            `https://flore-perche-sixt.herokuapp.com/rentaloffers${toAdd}`
          );
          const newOfferList = [];
          for (let i = 0; i < response.data.length; i++) {
            try {
              // Query to get details of each car
              const detailsResponse = await axios.get(
                `https://flore-perche-sixt.herokuapp.com/cardetails?id=${response.data[i].id}`
              );
              // Pushing the needed informations
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
          setOfferList(newOfferList);
        } catch (error) {
          setErrorMessage(
            "Aucun résultat pour cette agence aux dates sélectionnées : veuillez modifier votre recherche."
          );
        }
      };
      fetchData();
    }
  }, [selectedAgency, startDate, endDate]);

  // Filters > if there are filters : creating a filtered list with only the filtered cars
  useEffect(() => {
    let newfilteredOfferList = [];
    if (
      typeFilter[0].state ||
      typeFilter[1].state ||
      typeFilter[2].state ||
      typeFilter[3].state ||
      typeFilter[4].state
    ) {
      for (let i = 0; i < offerList.length; i++) {
        for (let j = 0; j < typeFilter.length; j++) {
          if (
            typeFilter[j].state &&
            offerList[i].bodyStyle === typeFilter[j].name
          ) {
            newfilteredOfferList.push(offerList[i]);
          }
        }
      }
      setFilteredOfferList(newfilteredOfferList);
    } else {
      setFilteredOfferList();
    }
  }, [typeFilter, offerList]);

  // Updating results list with / without filters
  useEffect(() => {
    setIsLoading(true);
    if (offerList) {
      if (filteredOfferList) {
        setResultsList(filteredOfferList);
      } else {
        setResultsList(offerList);
      }
    }
    setIsLoading(false);
  }, [offerList, filteredOfferList]);

  return (
    <div className="wrapper">
      {/* Header */}
      <Header type="steps" step="one" />
      {/* SearchBar */}
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

      {/* Bar with the filter button and the result number */}
      {errorMessage ? (
        <div className="no-result">{errorMessage}</div>
      ) : (
        <>
          <div className="infos-and-filter">
            <CarFilter
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              setIsLoading={setIsLoading}
            />
            {isLoading === false && (
              <p>
                <span>{resultsList.length}</span> OFFRE(S)
              </p>
            )}
          </div>

          {/* Car list according to the search and filters */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="car-list">
              {resultsList.map((elem, index) => {
                let totalPrice = 0;
                totalPrice = (elem.price * numberOfDays).toFixed(2);
                const dayPriceWithExtraFees = (
                  totalPrice / numberOfDays
                ).toFixed(2);

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
                        setSelectedCar={setSelectedCar}
                      />
                    )}
                  </>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Offers;
