import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip, Modal, Form, Input, message, Breadcrumb } from "antd";
import Link from "next/link";
import data from "../../data/productDetail/product.json";

import {
  onRemoveProductFromCart,
  onChangeProductCartQuantity,
} from "../../common/cartServices";
import { fetchCartRequest } from "../../redux/actions/cartActions";
import { formatCurrency } from "../../common/utils";
import {
  calculateTotalPrice,
  checkProductCartQuantity,
} from "../../common/shopUtils";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import FetchDataHandle from "../../components/other/FetchDataHandle";
import QuantitySelector from "../../components/other/QuantitySelector";
import ShopOrderStep from "../../components/shop/ShopOrderStep";
import PartnerOne from "../../components/sections/partners/PartnerOne";

function cart() {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({
    visible: false,
    message: "Add some message",
    cartId: null,
  });
  const cartState = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(fetchCartRequest());
  }, []);
  const showModal = (message, cartId) => {
    setModalState({ ...modalState, visible: true, message: message, cartId });
  };
  const onChangeQuantity = (product, quantity) => {
    onChangeProductCartQuantity({
      product,
      quantity: quantity,
      onSuccess: () => dispatch(fetchCartRequest()),
    });
  };
  const handleOk = (e) => {
    onRemoveProductFromCart({
      cartId: modalState.cartId,
      onSuccess: () => {
        setModalState({ ...modalState, visible: false });
        message.success("Product removed from cart");
        dispatch(fetchCartRequest());
      },
      onError: (mes) => {
        setModalState({ ...modalState, visible: false });
        message.error(mes);
      },
    });
  };
  const handleCancel = (e) => {
    setModalState({ ...modalState, visible: false });
  };
  const onSubmitCoupon = (values) => {
    console.log("Success:", values);
  };
  const onSubmitCouponFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LayoutOne title="Shopping Cart">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <ShopOrderStep current={1} />
        <FetchDataHandle
          emptyDescription="No product in cart"
          data={data}
          renderData={(data) => (
            <div className="cart">
              <div className="shop-table">
                <table>
                  <colgroup>
                    <col style={{ width: 150 / 16 + "em" }} />
                    <col style={{ width: "35%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    {/* <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} /> */}
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="text-white">Image</th>
                      <th className="text-white">Product Name</th>
                      <th className="text-white">Price</th>
                      {/* <th>Quantity</th> */}
                      {/* <th>Total</th> */}
                      <th>
                        <Tooltip title="Clear cart">
                          <Button
                            onClick={() =>
                              showModal(
                                "Are you sure to remove alll product from cart"
                              )
                            }
                            icon={<i className="fal fa-times" />}
                          ></Button>
                        </Tooltip>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="table-img">
                          <div className="table-img-wrapper">
                            <img
                              src={process.env.PUBLIC_URL + item.coverImage}
                              alt="Product image"
                            />
                          </div>
                        </td>
                        <td className="table-name text-white">{item.name}</td>
                        <td className="table-price text-white">
                        € {item.price}
                        </td>
                        {/* <td>
                          <QuantitySelector
                            max={item.quantity}
                            onChange={(val) => onChangeQuantity(item, val)}
                            defaultValue={item.cartQuantity}
                          />
                        </td> */}
                        {/* <td className="table-total">
                          {formatCurrency(item.price * item.cartQuantity)}
                        </td> */}
                        <td className="table-remove">
                          <Tooltip title="Remove product">
                            <Button
                              onClick={() =>
                                showModal(
                                  "Are you sure to remove this product from cart",
                                  item.id
                                )
                              }
                              icon={<i className="fal fa-times" />}
                            ></Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-footer">
                <div className="cart-footer__promo">
                  <Form
                    name="basic"
                    onFinish={onSubmitCoupon}
                    onFinishFailed={onSubmitCouponFailed}
                  >
                    <Form.Item
                      name="promo"
                      rules={[
                        {
                          required: true,
                          message: "Please provide a coupon code",
                        },
                      ]}
                    >
                      <Input placeholder="Coupon code" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Apply coupon
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <Button className="cart-footer__update" type="primary">
                  {/* <Link href={process.env.PUBLIC_URL + "/shop/shop-3-column"}> */}
                    <a>Update cart</a>
                  {/* </Link> */}
                </Button>
              </div>
              <div className="cart-total">
                <h5 className="text-white">Cart total</h5>
                <table>
                  <tbody>
                    <tr>
                      <th className="text-white">SUBTOTAL</th>
                      <td className="text-white">
                      € {calculateTotalPrice(cartState.data)}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-white">Vip</th>
                      <td >
                        <p  className="text-white">Dinner</p>
                        <p  className="text-white">Cofee,rest room</p>
                      </td>
                    </tr>
                    <tr >
                      <th  className="text-white">Total</th>
                      <td  className="text-white">
                      € {calculateTotalPrice(cartState.data)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-total__checkout">
                  <Button  shape="round">
                    <Link href={process.env.PUBLIC_URL + "/shop/reservation"}>
                      <a>Proceed to Checkout</a>
                    </Link>
                  </Button>
                  {/* <span>or</span>
                  <Button shape="round">
                    <Link href={process.env.PUBLIC_URL + "#"}>
                      <a>Check out with PayPal</a>
                    </Link>
                  </Button> */}
                </div>
              </div>
            </div>
          )}
        />
        {/* <PartnerOne /> */}
      </Container>

      <Modal
        visible={modalState.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalState.message}</p>
      </Modal>
    </LayoutOne>
  );
}

export default React.memo(cart);
