import "./Offers.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
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
}) => {
  const [offerList, setOfferList] = useState([]);
  const [typeFilter, setTypeFilter] = useState([
    { name: "ico-convertible", state: false },
    { name: "ico-limousine", state: false },
    { name: "ico-off-road", state: false },
    { name: "ico--coupe", state: false },
    { name: "ico-pickup", state: false },
  ]);
  const [carDetails, setCarDetails] = useState();
  console.log(carDetails);

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
          // console.log(response.data);
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
                  newOfferList.push({
                    id: response.data[i].id,
                    name: response.data[i].headlines.description,
                    subline: response.data[i].headlines.shortSubline,
                    mileageInfo: response.data[i].headlines.mileageInfo,
                    smallImage: response.data[i].images.small,
                    price: response.data[i].prices.dayPrice.amount,
                    bodyStyle: response.data[i].carGroupInfo.bodyStyleIcon,
                    carModal: false,
                  });
                }
              }
            } else {
              newOfferList.push({
                id: response.data[i].id,
                name: response.data[i].headlines.description,
                subline: response.data[i].headlines.shortSubline,
                mileageInfo: response.data[i].headlines.mileageInfo,
                smallImage: response.data[i].images.small,
                price: response.data[i].prices.dayPrice.amount,
                bodyStyle: response.data[i].carGroupInfo.bodyStyleIcon,
                carModal: false,
              });
            }
          }
          setOfferList(newOfferList);
        };
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedAgency, startDate, endDate, typeFilter]);

  const setCarModal = async (elem, index) => {
    const newOfferList = [...offerList];
    newOfferList[index].carModal = true;
    setOfferList(newOfferList);
    try {
      const response = await axios.get(
        `http://localhost:3003/cardetails?id=${elem.id}`
      );
      setCarDetails(response.data);
      console.log(response.data.splashImages[1]);
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <p>
          <span>{offerList.length}</span> OFFRE(S)
        </p>
        <button>
          <p>CATEGORIE DE VEHICULE</p> <i className=" ico-chevron-down" />{" "}
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            newTypeFilter[0].state = !newTypeFilter[0].state;
            setTypeFilter(newTypeFilter);
          }}
        >
          {typeFilter[0].state ? (
            <i className="ico-checkbox-checked" />
          ) : (
            <i className="ico-checkbox" />
          )}
          <p>CONVERTIBLE</p>
          <i className="ico-convertible" />
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            newTypeFilter[1].state = !newTypeFilter[1].state;
            setTypeFilter(newTypeFilter);
          }}
        >
          {typeFilter[1].state ? (
            <i className="ico-checkbox-checked" />
          ) : (
            <i className="ico-checkbox" />
          )}
          <p>SEDAN</p>
          <i className=" ico-limousine" />
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            newTypeFilter[2].state = !newTypeFilter[2].state;
            setTypeFilter(newTypeFilter);
          }}
        >
          {typeFilter[2].state ? (
            <i className="ico-checkbox-checked" />
          ) : (
            <i className="ico-checkbox" />
          )}
          <p>SUV</p>
          <i className="ico-off-road" />
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            newTypeFilter[3].state = !newTypeFilter[3].state;
            setTypeFilter(newTypeFilter);
          }}
        >
          {typeFilter[3].state ? (
            <i className="ico-checkbox-checked" />
          ) : (
            <i className="ico-checkbox" />
          )}
          <p>COUPE</p>
          <i className="ico-coupe" />
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            newTypeFilter[4].state = !newTypeFilter[4].state;
            setTypeFilter(newTypeFilter);
          }}
        >
          {typeFilter[4].state ? (
            <i className="ico-checkbox-checked" />
          ) : (
            <i className="ico-checkbox" />
          )}
          <p>PICKUP</p>
          <i className=" ico-pickup" />
        </button>
        <button
          onClick={() => {
            const newTypeFilter = [...typeFilter];
            for (let i = 0; i < newTypeFilter.length; i++) {
              newTypeFilter[i].state = false;
            }
            setTypeFilter(newTypeFilter);
          }}
        >
          REINITIALISER
        </button>
      </div>
      <div className="car-list">
        {offerList.map((elem, index) => {
          const totalPrice = (elem.price * numberOfDays).toFixed(2);

          return (
            <>
              <div
                className="car-card"
                key={elem.id}
                onClick={() => setCarModal(elem, index)}
              >
                <p className="car-name">{elem.name}</p>
                <p>{elem.subline}</p>
                <img src={elem.smallImage} alt="car" />
                <p>
                  <i className="ico-bullet-sm" /> {elem.mileageInfo}
                </p>
                <p className="basket day">
                  € <span>{elem.price}</span> | jour
                </p>
                <p className="basket total">€ {totalPrice} total</p>
              </div>
              {elem.carModal && carDetails && (
                <div className="car-modal">
                  <div className="carousel-car-wrapper">
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop="true"
                      autoPlay="true"
                    >
                      {carDetails.splashImages.map((carImg, carImgIndex) => {
                        return (
                          <div>
                            <img src={carImg} alt="car details" />
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                  <div>
                    {elem.id}
                    <i
                      className="ico-close"
                      onClick={() => {
                        const newOfferList = [...offerList];
                        newOfferList[index].carModal = false;
                        setOfferList(newOfferList);
                      }}
                    />
                    <p>{elem.name}</p>
                    <Link to="/offerconfig">
                      <button> Configuration</button>
                    </Link>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
