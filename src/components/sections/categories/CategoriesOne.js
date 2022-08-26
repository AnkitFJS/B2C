import React, { useEffect, useState, useCallback } from "react";
import Container from "../../other/Container";
import { Col, Row, Empty } from "antd";
import Link from "next/link";
import Axios from "axios";
function CategoriesOne({ data }) {
  const [getSpotlight, setSpotlight] = useState([]);

  const cleanData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { heading } = value.attributes;

      const updatedData = {
        heading,
      };
      return updatedData;
    });
    setSpotlight(mapData);
  }, []);

  let getData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/spotlight-headings`
      );
      cleanData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="categories-one">
      <Container>
        <div>
          <h1 className="hot-deals">{getSpotlight[0]?.heading}</h1>
        </div>
        {/* <Row gutter={[{ sm: 0, md: 15 }]}>
          {Categories && Categories.length > 0 ? (
            Categories.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <Link
                  href={process.env.PUBLIC_URL + `/shedule/[slug]`}
                  as={process.env.PUBLIC_URL + `/shedule/golf-club}`}
                >
                  <a
                    href={process.env.PUBLIC_URL + "/shop/shop-3-column"}
                    className="categories-one-item"
                  >
                    <div className="categories-one-item__image up-down-anim-hover">
                      {/* <span>{item.image.background}</span> */}
        {/* </Container><img src={item.image} alt="Category image" /> */}
        {/* </div> */}
        {/* <h2>{item.cardTitle}</h2> */}
        {/* <p>{item.cardDate}</p> */}
        {/* </a> */}
        {/* </Link> */}
        {/* </Col> */}
        {/* )) */}
        {/* ) : ( */}
        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        {/* )} */}
        {/* </Row> */}
      </Container>
    </div>
  );
}

export default React.memo(CategoriesOne);
