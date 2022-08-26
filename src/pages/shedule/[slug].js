import React, { useEffect ,useState} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Rate } from "antd";
import { fetchProductDetailRequest } from "../../redux/actions/shopActions";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ScheduleCard from "../../components/sections/schedule-card/ScheduleCard";
import data from "../../data/productDetail/product.json";
import { formatCurrency } from "../../common/utils";
import TimeArray from "../../data/productDetail/timeArray.json";
import axios from "axios";

function productDetail() {
  const dispatch = useDispatch();
  const [getGolfDeal, setGolfDeal] = useState();

  const router = useRouter();
  const { slug } = router.query;
  console.log(slug,"slug")
  const shopState = useSelector((state) => state.shopReducer);
  const { productDetail } = shopState;
  useEffect(() => {
    dispatch(fetchProductDetailRequest(slug));
    getData1()
  }, []);
 // const image = window?.location?.href?.split("?")

  const getData1 = async () => {
    const response = await axios.get(
      `https://test-cm.zest.golf/partner/facility/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "markusk@platzdasch.de",
          password: "l)@n59yivL",
        },
      }
    );
    setGolfDeal(response.data.data)
    console.log(response, "response hammad detail");
  };
  // console.log()
  return (
    <LayoutOne title="Product detail">
      <div className="product-detail">
        <Container>
          <Row gutter={30}>
            <Col xs={24} md={10}>
              <a title={data[0]?.name}>
                <img
                  src={getGolfDeal?.images[0]}
                  alt="Product image"
                  style={{ width: "100%" }}
                />
              </a>
              <p className="product-detail-content__description">
                {/* Casselberry Golf Club 300 S Triplet Lake Dr, Casselberry,
                Florida, 32707 */}
                {/* {getGolfDeal?.description} */}
              </p>
              <h3 className="product-detail-content__price">
                {/* {data[0].discount && <del>{formatCurrency(data[0].price)}</del>} */}
                {/* <div className="product-detail-content__price-discount">
                  <h5>
                    {data[0].discount
                      ? formatCurrency(data[0].price - data[0].discount)
                      : formatCurrency(data[0].price)}
                  </h5>
                  <span>
                    <Rate defaultValue={data[0].rate} />
                  </span>
                </div> */}
              </h3>
              <p className="product-detail-content__description">
                {getGolfDeal?.description?.substring(0, 200)}
              </p>
              {/* <p>Services:</p> */}


            </Col>
            <Col xs={24} md={14}>
              <ScheduleCard data={TimeArray} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>{/* <PartnerOne /> */}</Container>
    </LayoutOne>
  );
}

export default React.memo(productDetail);
