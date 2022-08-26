import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../client";
import * as shopActions from "../redux/actions/shopActions";
import LayoutOne from "../components/layout/LayoutOne";
import HeroSliderOne from "../components/sections/hero-slider/HeroSliderOne";
import heroslideOneData from "../data/sections/hero-slider.json";
import Benefits from "../components/other/Benefits";
import CategoriesOne from "../components/sections/categories/CategoriesOne";
import categoriesOneData from "../data/sections/categories.json";
import ProductTab from "../components/sections/product-thumb/ProductTab";
import categories from "../data/categories.json";
import IntroductionOne from "../components/sections/introduction/IntroductionOne";
import introductionOneData from "../data/sections/introduction.json";
import DowOne from "../components/sections/dale-of-week/DowOne";
import dowOneData from "../data/sections/dale-of-week.json";
import PartnerOne from "../components/sections/partners/PartnerOne";
import Container from "../components/other/Container";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const [getDeals, setDeals] = useState([]);
  const [getGolfDeal, setGolfDeal] = useState([]);
  const [allData, setAllData] = useState([]);


  const cleanHotDealData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { heading } = value.attributes;

      const updatedData = {
        heading,
      };
      return updatedData;
    });
    setDeals(mapData);
  }, []);

  let getheadingData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/today-hot-deal-near-me-headings`
      );
      cleanHotDealData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData1();
    getheadingData();
  }, [getheadingData]);
  const getData1 = async () => {
    const response = await axios.get(
      "https://test-cm.zest.golf/facilities/all/91?offset=0&limit=20&status=Connected",
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
    setAllData(response.data.data.records)
    console.log(response, "response hammad");
  };

  const cleanHeadingData = useCallback((rawData) => {
    const mapData = rawData.data.map((value) => {
      const { heading } = value.attributes;

      const updatedData = {
        heading,
      };
      return updatedData;
    });
    setGolfDeal(mapData);
  }, []);

  let getData = useCallback(async () => {
    try {
      const response = await Axios.get(
        `https://strapi-app-be.herokuapp.com/api/deal-of-golf-headings`
      );
      cleanHeadingData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const [currentProductTabsCategory, setCurrentProductTabsCategory] = useState({
    daleProducts: "",
  });
  const { fetchDaleProductsRequest } = shopActions;
  const shopState = useSelector((state) => state.shopReducer);
  const { daleProducts } = shopState;
  useEffect(() => {
    dispatch(fetchDaleProductsRequest({ limit: 8 }));
  }, []);
  useEffect(() => {
    dispatch(
      fetchDaleProductsRequest({
        limit: 8,
        category: currentProductTabsCategory.daleProducts,
      })
    );
  }, [currentProductTabsCategory.daleProducts]);

  return (
    <LayoutOne title="Tee Times">
      <HeroSliderOne data={heroslideOneData.one} />
      <Container>
        <Benefits
          threeCol
          style={{
            marginTop: -75 / 16 + "em",
            position: "relative",
            zIndex: 2,
          }}
        />
      </Container>

      <CategoriesOne data={categoriesOneData.one} />
      <Container>
        <ProductTab
          data={allData}
          productCol={{ xs: 12, sm: 8, lg: 6 }}
          onTabChange={(val) =>
            setCurrentProductTabsCategory({
              ...currentProductTabsCategory,
              daleProducts: val,
            })
          }
          headerCategories={categories.slice(0, 5).map((item) => item.name)}
          headerTitle={getGolfDeal[0]?.heading}
        />
      </Container>
      {/* <div>
        <h1 className="hot-deals">{getDeals[0]?.heading}</h1>
      </div>
      <IntroductionOne data={introductionOneData.one} /> */}
      <DowOne data={dowOneData.one} countdownLast={100000000} />
      <Container>{/* <PartnerOne /> */}</Container>
    </LayoutOne>
  );
}
