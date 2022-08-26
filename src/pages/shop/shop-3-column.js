import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Pagination, Breadcrumb } from "antd";
import { useRouter } from "next/router";

import {
  fetchProductsRequest,
  fetchFeaturedProductsRequest,
} from "../../redux/actions/shopActions";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ProductGrid from "../../components/sections/product-thumb/ProductGrid";
import ShopHeader from "../../components/shop/ShopHeader";

function shopGrid3Column() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { q } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const shopState = useSelector((state) => state.shopReducer);
  const { products } = shopState;
  const shopFilterState = useSelector((state) => state.shopFilterReducer);
  const { sort, show, view, category, color, size, tag } = shopFilterState;
  useEffect(() => {
    dispatch(fetchFeaturedProductsRequest({ limit: 4 }));
  }, []);
  useEffect(() => {
    dispatch(
      fetchProductsRequest({
        limit: show,
        category: null,
        page: currentPage,
        q,
        sort,
        view,
        category,
        color,
        size,
        tag,
      })
    );
  }, [shopFilterState, currentPage, q]);
  const onPaginationChange = (current) => {
    setCurrentPage(current);
  };
  const dataArray = [
    {
      name: "Golf Passport Round 3 ",
      coverImage: "/assets/images/golfpass/Cascais_Golf_Passport-Logo-Black-RGB-150mm@300ppi.jpg",
      price: 100,
      discount: 10,
      slug:"golf-club",
      id:1
    },
    {
      name: "Golf Passport Round 4",
      coverImage: "/assets/images/golfpass/Cascais_Golf_Passport-Logo-Black-RGB-150mm@300ppi.jpg",
      price: 100,
      discount: 10,
      slug:"golf-club",
      id:2
    },
    {
      name: "Golf Passport Round 5",
      coverImage: "/assets/images/golfpass/Cascais_Golf_Passport-Logo-Black-RGB-150mm@300ppi.jpg",
      price: 890,
      discount: 120,
      slug:"golf-club",
      id:3
    }
  ];
  return (
    <LayoutOne title="Shop grid fullwidth">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
        </Breadcrumb>
        <div className="shop">
          <div className="shop-content">
            <Row gutter={30}>
              <Col xs={24} lg={8}>
                <ShopSidebar style={{ marginTop: 10 / 16 + "em" }} />
              </Col>
              <Col xs={24} lg={16}>
                <ShopHeader title="Shop grid fullwidth" />
                <ProductGrid
                  data={dataArray}
                  hideHeader
                  productCol={
                    view === "list"
                      ? { xs: 24, sm: 12, md: 24 }
                      : { xs: 12, sm: 12, md: 8, lg: 8 }
                  }
                  redirected={true}
                  productType={view}
                />
                {/* {products.count > 0 && (
                  <Pagination
                    onChange={onPaginationChange}
                    defaultCurrent={currentPage}
                    pageSize={show}
                    total={products.count}
                  />
                )} */}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </LayoutOne>
  );
}

export default React.memo(shopGrid3Column);
