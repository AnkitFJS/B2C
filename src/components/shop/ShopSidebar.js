import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import {
  setCurrentColor,
  setCurrentCategory,
  setCurrentSize,
  setCurrentTag,
} from "../../redux/actions/shopFilterActions";
import categories from "../../data/categories.json";
import { Button } from "antd";

const data = {
  color: [
    { name: "Driving Range", colorCode: "#848484", value: "" },
    { name: "Chipping Area", colorCode: "#848484", value: "black" },
    { name: "Putting Green", colorCode: "#848484", value: "blue" },
    { name: "Pro Shop", colorCode: "#848484", value: "gray" },
    { name: "Golf School (Lessons)", colorCode: "#848484", value: "green" }
  ],
  size: [
    { name: "Golf Buggy", value: "" },
    { name: "Push Trolley", value: "xl" },
    { name: "Electric Trolley", value: "l" },
    { name: "Golf Club Rentals", value: "m" },
    { name: "Caddies", value: "s" },
  ],
  tags: [
    { name: "Restaurant", value: "" },
    { name: "Bar", value: "Bar" },
    { name: "Locker Room", value: "vegetable" },
    { name: "WiFi", value: "meat" },
    { name: "Shuttle Service", value: "meat" },

  ],
};

const ShopSidebarSection = ({ children, title, className }) => {
  return (
    <div className={`shop-sidebar-section ${classNames(className)}`}>
      <div className="shop-sidebar-section__header">
        <h5 style={{color:'white'}}>{title}</h5>
      </div>
      <div className="shop-sidebar-section__content">{children}</div>
    </div>
  );
};

function ShopSidebar({ showShortcut, style }) {
  const dispatch = useDispatch();
  const shopFilterState = useSelector((state) => state.shopFilterReducer);
  const { category, color, size, tag } = shopFilterState;
  const onChooseCategory = (e, val) => {
    e.preventDefault();
    dispatch(setCurrentCategory(val));
  };
  const onChooseColor = (e, val) => {
    e.preventDefault();
    dispatch(setCurrentColor(val));
  };
  const onChooseSize = (e, val) => {
    e.preventDefault();
    dispatch(setCurrentSize(val));
  };
  const onChooseTag = (val) => {
    dispatch(setCurrentTag(val));
  };
  return (
    <div style={style} className="shop-sidebar">
      <ShopSidebarSection className="-departments" title="Departments">
        <ul>
          <li className={classNames({ active: category === "" })}>
            <a onClick={(e) => onChooseCategory(e, "")} href="#">
              All departments
            </a>
          </li>
          {categories.map((item, index) => (
            <li
              className={classNames({ active: category === item.value })}
              key={index}
            >
              <a onClick={(e) => onChooseCategory(e, item.value)} href="#">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </ShopSidebarSection>
      {!showShortcut && (
        <>
          <ShopSidebarSection className="-colors" title="GOLF FACILITIES">
            <ul>
              {data.color.map((item, index) => (
                <li
                  className={classNames({ active: color === item.value })}
                  key={index}
                >
                  <a onClick={(e) => onChooseColor(e, item.value)} href="#">
                    <span style={{ backgroundColor: item.colorCode }}></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </ShopSidebarSection>
          <ShopSidebarSection className="-size" title="HIRE/RENTALS">
            <ul>
              {data.size.map((item, index) => (
                <li
                  className={classNames({ active: size === item.value })}
                  key={index}
                >
                  <a onClick={(e) => onChooseSize(e, item.value)} href="#">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </ShopSidebarSection>
          <ShopSidebarSection className="-size" title="OTHERS">
            <ul>
              {data.tags.map((item, index) => (
                <li
                  className={classNames({ active: size === item.value })}
                  key={index}
                >
                  <a onClick={(e) => onChooseSize(e, item.value)} href="#">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </ShopSidebarSection>
        </>
      )}

      {/* <ShopSidebarSection className="-tags" title="Popular tags">
        {data.tags.map((item, index) => (
          <Button
            className={classNames({ active: tag === item.value })}
            onClick={() => onChooseTag(item.value)}
            key={index}
          >
            {item.name}
          </Button>
        ))}
      </ShopSidebarSection> */}
    </div>
  );
}

export default React.memo(ShopSidebar);
