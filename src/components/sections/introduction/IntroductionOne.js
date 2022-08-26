import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";
import Axios from "axios";

function IntroductionOne({ data }) {
  const [strapiData, setStrapiData] = useState([]);
  let URL = "https://strapi-app-be.herokuapp.com";
  const cleanData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { buttonText, backgroundImage, featuredImage } = value.attributes;
      const { data } = backgroundImage;
      let backgroundImageUrl;
      data.map((item) => {
        backgroundImageUrl = item.attributes.url;
      });
      let frontImageUrl;
      const data2 = featuredImage.data;
      data2.map((item) => {
        frontImageUrl = item.attributes.url;
      });

      const updatedData = {
        buttonText,
        backgroundImageUrl,
        frontImageUrl,
      };
      return updatedData;
    });
    setStrapiData(mapData);
  }, []);

  let getSliderData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `${URL}/api/hot-deal-near-me-datas?populate=*`
      );
      cleanData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSliderData();
  }, [getSliderData]);

  console.log(strapiData, "hook data");
  return (
    <div className="introduction-one">
      {strapiData.map((item, index) => (
        <div
          key={index}
          className="introduction-one-item"
          style={{
            backgroundImage: `url('${item.backgroundImageUrl}')`,
          }}
        >
          <img
            src={item.frontImageUrl}
            alt="Introduction image"
            style={{ width: "100%" }}
          />
          <Button type="primary" shape="round">
            <Link
              href={process.env.PUBLIC_URL + `/shedule/[slug]`}
              as={process.env.PUBLIC_URL + `/shedule/golf-club}`}
            >
              <a href={process.env.PUBLIC_URL + "/shedule/golf-club"}>
                {item.buttonText}
              </a>
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(IntroductionOne);
