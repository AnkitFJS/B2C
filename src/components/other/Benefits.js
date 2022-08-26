import React, { useEffect, useCallback, useState } from "react";
import { Row, Col } from "antd";
import classNames from "classnames";
import benefitsData from "../../data/benefits.json";
import Axios from "axios";

function Benefits({ containerFluid, column, threeCol, style, className }) {
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
        `https://strapi-app-be.herokuapp.com/api/benefits?populate=*`
      );
      cleanData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderCol = () => {
    return threeCol
      ? { xs: 24, md: 8 }
      : column
      ? { xs: 24, sm: 12, md: 6, lg: 24 }
      : { xs: 24, md: 6 };
  };
  const col = renderCol();
  return (
    <div
      className={`benefits ${classNames(className, { "-column": column })}`}
      style={style}
    >
      <div className="benefits-wrapper">
        <Row gutter={10}>
          {getBenefits
            .slice(0, threeCol ? 3 : benefitsData.length)
            .map((item, index) => (
              <Col key={index} {...renderCol()}>
                <div className="benefits-item">
                  <img
                    className="benefits-item__image"
                    src={item.iconImage}
                    alt="Benefit icon"
                  />
                  <h5 className="benefits-item__title">{item.heading}</h5>
                  <p className="benefits-item__description">
                    {item.subHeading}
                  </p>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default React.memo(Benefits);
