import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formatCurrency } from "../../../common/utils";
import { calculateTotalPrice } from "../../../common/shopUtils";

function FunctionItems({ hideTotal, hideWishlist }) {
  const cartState = useSelector((state) => state.cartReducer);
  return (
    <div className="function-items">
      {!hideWishlist && (
        <Link href={process.env.PUBLIC_URL + "/shop/wishlist"}>
          <a className="function-items-item">
            <i className="icon_heart_alt" style={{color:'white'}}/>
          </a>
        </Link>
      )}

      <Link href={process.env.PUBLIC_URL + "/shop/cart"}>
        <a className="function-items-item">
          <i className="icon_bag_alt" style={{color:'white'}}/>

          {/* {!hideTotal &&
            (cartState.data ? (
              <span>{formatCurrency(calculateTotalPrice(cartState.data))}</span>
            ) : (
              <span>{formatCurrency(0)}</span>
            ))} */}
             <span style={{fontSize:16,color:'white'}}>Signup</span>
        </a>
      </Link>
    </div>
  );
}

export default React.memo(FunctionItems);
