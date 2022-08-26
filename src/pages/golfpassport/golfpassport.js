import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

import { fetchProductDetailRequest } from "../../redux/actions/shopActions";
import LayoutOne from "../../components/layout/LayoutOne";
import ProductDetailLayout from "../../components/detail/product/ProductDetailLayout";
import Container from "../../components/other/Container";
import ShopSidebar from "../../components/shop/ShopSidebar";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import FetchDataHandle from "../../components/other/FetchDataHandle";
import data from '../../data/productDetail/product.json';
import Product from "../../components/product/Product";
// import FetchDataHandle from "../other/FetchDataHandle";
function golfPass() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const shopState = useSelector((state) => state.shopReducer);
  const { productDetail } = shopState;
  useEffect(() => {
    dispatch(fetchProductDetailRequest(slug));
  }, []);
  const dataArray = [
    {
      name: "3 Round ",
      coverImage: "/assets/images/sections/introduction/quinta-da-marinha-golf-course-12-xl.jpg",
      price: 100,
      discount: 10,
      slug:"golf-club",
      id:1
    },
    {
      name: "4 Round",
      coverImage: "/assets/images/sections/introduction/53457cd89ff50ce09777f77c67a9b070.jpg",
      price: 100,
      discount: 10,
      slug:"golf-club",
      id:2
    },
    {
      name: "5 Round",
      coverImage: "/assets/images/sections/introduction/33.jpeg",
      price: 890,
      discount: 120,
      slug:"golf-club",
      id:3
    }
  ];
  
//   const productCol={{ xs: 12, sm: 8, lg: 6 }}
  return (
    <LayoutOne title="Product detail">
      {/* <div className="product-detail">
        <Container>
          <Row gutter={30}>
            <Col xs={24} md={6}>
              <ShopSidebar showShortcut />
            </Col>
            <Col xs={24} md={18}>
              <FetchDataHandle
                data={data}
                renderData={(data) => <ProductDetailLayout data={data[0]} />}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
      </Container> */}
        <Container>
         <FetchDataHandle
      data={dataArray}
      renderData={(data) => (
        <Row
          gutter={[
            { xs: 0, md: 15 },
            { xs: 0, md: 15 },
          ]}
        >
          {data.map((item, index) => (
            <Col key={index} md={12}>
              <Product data={item} redirect={false} round={true}/>
            </Col>
          ))}
        </Row>
      )}
    />
    </Container>
    </LayoutOne>
  );
}

export default React.memo(golfPass);
