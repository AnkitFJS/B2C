import { Button, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Breadcrumb } from "antd";

import LayoutOne from "../components/layout/LayoutOne";
import Container from "../components/other/Container";

export default function error() {
  return (
    <LayoutOne title="404 Error">
      <Container>
        <Breadcrumb separator=">" >
          <Breadcrumb.Item className="text-white">
            <i className="fas fa-home"/>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">404 Error</Breadcrumb.Item>
        </Breadcrumb>
        <div className="error">
          <Row gutter={50}>
            <Col xs={24} md={12}>
              <div className="error-content text-white" >
                <h2 className="text-white">OPPS! THIS PAGE COULD NOT BE FOUND</h2>
                <p className="text-white">
                  Sorry bit the page you are looking for does not exist, have
                  been removed or name changed
                </p>
                <Button  shape="round">
                  <Link href={process.env.PUBLIC_URL + "/"}>
                    <a>Go to homepage</a>
                  </Link>
                </Button>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="error-img">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/pages/404/1.png"
                  }
                  alt="404 Image"
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </LayoutOne>
  );
}
