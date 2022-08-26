import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import Countdown, { zeroPad } from "react-countdown";
import { Row, Col } from "antd";
import Container from "../../other/Container";
import SectionTitle from "../../other/SectionTitle";
import Axios from "axios";

const DownOneItem = React.memo(({ reverse, data }) => {
  return (
    <div
      className={`dow-one-content__item ${classNames({ "-reverse": reverse })}`}
    >
      <div className="dow-one-content__item-image">
        <img
          src={data.iconImage}
          alt="week icon"
        />
      </div>
      <div className="dow-one-content__item-content">
        <h5 style={{color:'white'}}>{data.heading}</h5>
        <p>{data.subHeading}</p>
      </div>
    </div>
  );
});

function DowOne({ data, countdownLast }) {
  const [strapiData, setStrapiData] = useState([]);
  const [getBenefits, setBenefits] = useState([]);

  const cleanData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { heading, subHeading, icon } = value.attributes;
      const { data } = icon;
      let iconImage;
      data.map((item) => {
        iconImage = item.attributes.url;
      });
      const updatedData = {
        heading,
        subHeading,
        iconImage,
      };
      return updatedData;
    });
    setBenefits(mapData);
  }, []);

  let getData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/benefit-of-deal-of-weeks?populate=*`
      );
      cleanData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const cleanHeadingData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { heading, featuredImage } = value.attributes;
      let frontImageUrl;
      const data2 = featuredImage.data;
      data2.map((item) => {
        frontImageUrl = item.attributes.formats.thumbnail.url;
      });

      const updatedData = {
        heading,
        frontImageUrl,
      };
      return updatedData;
    });
    setStrapiData(mapData);
  }, []);

  let getHeadingData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/deal-of-the-weeks?populate=*`
      );
      cleanHeadingData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getHeadingData();
  }, [getHeadingData]);

  return (
    <div className="dow-one">
      <Container>
        <SectionTitle title={strapiData[0]?.heading} className="-title-white -center" />
        <div className="dow-one-content">
          <Row align="center" gutter={15}>
            <Col md={12} lg={8}>
              <Row gutter={[0, 30]}>
                {getBenefits.slice(0, 2).map((item, index) => (
                  <Col key={index} span={24}>
                    <DownOneItem reverse data={item} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={0} lg={8}>
              <img
                className="dow-one-image"
                src={strapiData[0]?.frontImageUrl}
                alt="Dale of the week image"
              />
            </Col>
            <Col md={12} lg={8}>
              <Row gutter={[0, 30]}>
                {getBenefits.slice(2, 3).map((item, index) => (
                  <Col key={index} span={24}>
                    <DownOneItem data={item} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        <Countdown
          date={Date.now() + countdownLast}
          renderer={({ days, hours, minutes, seconds }) => {
            return (
              <div className="dow-one-countdown">
                <div className="dow-one-countdown-item">
                  <h6 style={{color:'white'}}>{zeroPad(days)}</h6> <span>days</span>
                </div>
                <div className="dow-one-countdown-item">
                  <h6 style={{color:'white'}}>{zeroPad(hours)}</h6> <span>hr</span>
                </div>
                <div className="dow-one-countdown-item">
                  <h6 style={{color:'white'}}>{zeroPad(minutes)} </h6>
                  <span>min</span>
                </div>
                <div className="dow-one-countdown-item">
                  <h6 style={{color:'white'}}>{zeroPad(seconds)}</h6> <span>sec</span>
                </div>
              </div>
            );
          }}
        />
      </Container>
    </div>
  );
}

export default React.memo(DowOne);
