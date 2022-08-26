import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Tooltip,
  Modal,
  Form,
  Input,
  message,
  Breadcrumb,
  Row,
  Col,
} from "antd";
import Link from "next/link";

import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopOrderStep from "../../components/shop/ShopOrderStep";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ProductGrid from "../../components/sections/product-thumb/ProductGrid";
import ShopHeader from "../../components/shop/ShopHeader";
function cart() {
  const dispatch = useDispatch();
  const shopFilterState = useSelector((state) => state.shopFilterReducer);
  const { sort, show, view, category, color, size, tag } = shopFilterState;

  const dataArray = [
    {
      name: "Estoril Golf",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/47/5042ce74-d098-4afc-9ed8-2967ec457bfb",
      price: 100,
      discount: 10,
      slug: "golf-club",
      id: 1,
    },
    {
      name: "Penha Longa",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/55/5fbdb659-7731-410f-a62a-42eaf82f39ad",
      price: 100,
      discount: 10,
      slug: "golf-club",
      id: 2,
    },
    {
      name: "Onyria Quinta da Marinha Golf Resort",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/26/c8dc862d-cf05-45d5-8115-5b43eeb1d590",
      price: 890,
      discount: 120,
      slug: "golf-club",
      id: 3,
    },
    {
      name: "Oitavos Dunes",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/9/e02560d7-0490-4cf7-84ad-1a36c6ebf55d",
      price: 890,
      discount: 120,
      slug: "golf-club",
      id: 3,
    },
    {
      name: "Belas Clube de Campo",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/61/392a6e45-a3b9-45d2-ad68-b3c99960523d",
      price: 890,
      discount: 120,
      slug: "golf-club",
      id: 3,
    },
    {
      name: "Lisbon Sports Club",
      coverImage:
        "https://test-cm.zest.golf//branding/facility/66/304e167e-4757-468d-90ff-9e1ef033f4e8",
      price: 890,
      discount: 120,
      slug: "golf-club",
      id: 3,
    },
  ];
  return (
    <LayoutOne title="Shopping Cart">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Reservation</Breadcrumb.Item>
        </Breadcrumb>
        <ShopOrderStep current={2} />
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
                  productType={view}
                  redirected={false}
                />
                <div className="cart-total__checkout">
                  <Button shape="round">
                    <Link href={process.env.PUBLIC_URL + "/shop/checkout"}>
                      <a>Proceed to Checkout</a>
                    </Link>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </LayoutOne>
  );
}

export default React.memo(cart);
