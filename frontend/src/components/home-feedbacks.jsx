import FeedbackCard from "./feedback-card";
import demoImg from "../assets/demo-pic.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home-feedback.css";
function HomeFeedback() {
  const testimonials = [
    {
      id: 1,
      name: "Rukmini Daw",
      image: demoImg,
      quote:
        "We have a huge community to help you share yourexperience and feelings to help and to help others as well as to seek help and comfort from other have faced a simila seek help and comfort from other people who have faced a similar situatio might have faced a similar situation. You can do it comfort from other people who ANONYMOUSLY! ",
      date: "jan 24 2023",
    },
    {
      id: 2,
      name: "Diya Ghosh",
      image: demoImg,
      quote:
        "We have a huge community to help you share yourexperience and feelings to help and to help others as well as to seek help and comfort from other have faced a simila seek help and comfort from other people who have faced a similar situatio might have faced a similar situation. You can do it comfort from other people who ANONYMOUSLY! ",
      date: "jan 24 2023",
    },
    {
      id: 3,
      name: "Diya Ghosh",
      image: demoImg,
      quote:
        "We have a huge community to help you share yourexperience and feelings to help and to help others as well as to seek help and comfort from other have faced a simila seek help and comfort from other people who have faced a similar situatio might have faced a similar situation. You can do it comfort from other people who ANONYMOUSLY! ",
      date: "jan 24 2023",
    },
    {
      id: 4,
      name: "Diya Ghosh",
      image: demoImg,
      quote:
        "We have a huge community to help you share yourexperience and feelings to help and to help others as well as to seek help and comfort from other have faced a simila seek help and comfort from other people who have faced a similar situatio might have faced a similar situation. You can do it comfort from other people who ANONYMOUSLY! ",
      date: "jan 24 2023",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of cards to show in a single slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Adjust based on your desired breakpoint
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Adjust based on your desired breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container-lg feedback-sec">
        <div className="container-1280-width slide">
          <h1 className="heading text-center">Feedbacks</h1>
          <Slider {...settings}>
            {testimonials.map((item) => {
              return (
                <FeedbackCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quote={item.quote}
                  image={item.image}
                  date={item.date}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default HomeFeedback;
