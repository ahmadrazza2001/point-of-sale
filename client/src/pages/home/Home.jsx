import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch } from "react-redux";
import {lHost } from "../../host";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const categories = [
    {
      name: "pizzas",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2602/2602303.png",
    },
    {
      name: "burgers",
      imageUrl:
        "data:image/png;base64,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",
    },
    {
      name: "drinks",
      imageUrl:
        "https://cdn.iconscout.com/icon/free/png-256/free-beverage-1468789-1242983.png",
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(`${lHost}/api/products/get-products`);
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <div className="category" style={{ paddingTop: "80px" }}>
        {categories.map((category) => (
          <div
            key={category.name}
            className={`categoryFlex ${
              selectedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h3 className="categoryName">{category.name}</h3>
            <img
              src={category.imageUrl}
              alt={category.name}
              height={100}
              width={100}
            />
          </div>
        ))}
      </div>
      <Row justify="center" style={{ width: "60%", margin: "0 auto" }}>
        {productData
          .filter((i) => i.category === selectedCategory)
          .map((product) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="product-col"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <Product key={product.id} product={product} />
            </Col>
          ))}
      </Row>
    </LayoutApp>
  );
};

export default Home;
