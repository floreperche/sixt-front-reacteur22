import { Carousel } from "react-responsive-carousel";
import carousel1 from "../../assets/img/carousel/carousel-1.jpeg";
import carousel2 from "../../assets/img/carousel/carousel-2.jpeg";
import carousel3 from "../../assets/img/carousel/carousel-3.jpeg";

const HomeCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop="true"
      autoPlay="true"
    >
      <div>
        <img src={carousel1} alt="first carousel" />
      </div>
      <div>
        <img src={carousel2} alt="second carousel" />
      </div>
      <div>
        <img src={carousel3} alt="third carousel" />
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
