import { Col, Row } from "antd";
import React from "react";
import classNames from "classnames";

import Product from "../../product/Product";
import ReservationProduct from "../../product/ReservationProduct";

import SectionTitle from "../../other/SectionTitle";
import FetchDataHandle from "../../other/FetchDataHandle";

function ProductGrid({
  style,
  productClassName,
  productCol,
  productType,
  data,
  headerTitle,
  headerClass,
  hideHeader,
  fiveCol,
  className,
  gutter = [
    { xs: 0, md: 15 },
    { xs: 0, md: 15 },
  ],
  redirected,
}) {
  console.log(!redirected, "redirected");
  return (
    <div className={`product-grid ${classNames(className)}`} style={style}>
      {!hideHeader && (
        <div className={`product-grid-header ${classNames(headerClass)}`}>
          <SectionTitle title={headerTitle} hideDecoration />
        </div>
      )}
      <div className="product-grid-content">
        <FetchDataHandle
          data={data}
          renderData={(data) => (
            <Row gutter={gutter}>
              {data.map((item, index) => (
                <Col
                  key={index}
                  {...productCol}
                  className={classNames({ "five-col": fiveCol })}
                >
                  {redirected ? (
                    <Product
                      type={productType}
                      className={productClassName}
                      data={item}
                      round={true}
                      redirect={false}
                    />
                  ) : (
                    <ReservationProduct
                      type={productType}
                      className={productClassName}
                      data={item}
                    />
                  )}
                </Col>
              ))}
            </Row>
          )}
        />
      </div>
    </div>
  );
}

export default React.memo(ProductGrid);
