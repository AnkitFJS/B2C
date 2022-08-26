import React, { useEffect, useState, useCallback } from "react";
import { Button, Row, Col } from "antd";
import Slider from "react-slick";
import Link from "next/link";
import classNames from "classnames";
import { formatCurrency } from "../../../common/utils";
import { NextArrow, PrevArrow } from "../../other/SliderArrow";
import Container from "../../other/Container";
import Axios from "axios";

function HeroSliderOne({ data }) {
  const [currentSlideIndex, setNextSlideIndex] = useState(0);
  const [getSlider, setSlider] = useState([]);

  const cleanData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const {
        heading,
        price,
        packages,
        buttonText,
        backgroundImage,
        // sideImage,
      } = value.attributes;
      const { data } = backgroundImage;
      console.log(data,"data hammad")
      let backgroundImageUrl;
      data.map((item) => {
        backgroundImageUrl = item.attributes.url;
      });
      // let sideImageUrl;
      // const data2 = sideImage.data;
      // data2.map((item) => {
      //   sideImageUrl = item.attributes.url;
      // });

      const updatedData = {
        heading,
        price,
        packages,
        buttonText,
        backgroundImageUrl,
        // sideImageUrl,
      };
      return updatedData;
    });
    setSlider(mapData);
  }, []);

  let getSliderData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/sliders?populate=*`
      );
      cleanData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const beforeChange = (oldIndex, newIndex) => {
    setNextSlideIndex(newIndex);
  };

  useEffect(() => {
    getSliderData();
  }, [getSliderData]);

  useEffect(() => {
    const currentSlide = document.querySelector(
      `.hero-slider.-style-one .slick-slide[data-index="${currentSlideIndex}"]`
    );
    const animationItems = currentSlide?.querySelectorAll("[data-animation]");
    animationItems?.forEach((item, index) => {
      const animationName = item.dataset.animation;
      const animationDelay = item.dataset.delay;
      console.log(animationName);
      item.classList.add("animate__animated", animationName);
      item.style.animationDelay = animationDelay + "s";
      item.addEventListener("animationend", function () {
        this.classList.remove("animate__animated", animationName);
        this.removeEventListener("animationend", function () {
          return;
        });
      });
    });
  }, [currentSlideIndex]);
  return (
    <div className="hero-slider -carousel -style-one">
      <Slider
        beforeChange={beforeChange}
        className="arrow-center"
        {...settings}
      >
        {getSlider?.map((item, index) => (
          <div
            key={index}
            className={`slick-slider-item ${classNames({
              active: index === currentSlideIndex,
            })}`}
          >
            <div className="hero-slider-background">
              <img
                src={item.backgroundImageUrl}
                alt="Hero slider background image"
              />
            </div>
            <Container>
              <div className="hero-slider-content-wrapper">
                <Row align="middle" gutter={30}>
                  <Col sm={12}>
                    <div className="hero-slider-content">
                      <h5 data-animation="animate__fadeInDown">
                        {item.subTitle}
                      </h5>
                      <h1 data-delay="0.2" data-animation="animate__fadeInDown" style={{color:'white'}}>
                        {item.heading}
                      </h1>
                      <h3 data-delay="0.4" data-animation="animate__fadeInDown">
                        {/* {formatCurrency(item.price.main)} */}
                        {item.price}
                        <span style={{color:'white'}}>/{item.packages}</span>
                      </h3>
                      <Button
                        data-delay="0.6"
                        data-animation="animate__fadeInDown"
                        type="primary"
                        shape="round"
                      >
                        <Link
                          href={process.env.PUBLIC_URL + "/shop/shop-3-column"}
                        >
                          <a>{item.buttonText}</a>
                        </Link>
                      </Button>
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div
                      data-delay="0.8"
                      data-animation="animate__zoomInRight"
                      className="hero-slider-image"
                    >
                      {/* <img
                        src={`https://strapi-app-be.herokuapp.com${item.sideImageUrl}`}
                        alt="Hero slider image"
                        style={{ opacity: 0.1 }}
                      /> */}
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default React.memo(HeroSliderOne);
