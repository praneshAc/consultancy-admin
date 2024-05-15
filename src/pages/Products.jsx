import { Button, Row, Col } from "antd";
import ProductCard from "../components/productcard/ProductCard";
import React, { useEffect, useState } from "react";
import ProductForm from "../components/productcard/ProductForm";
import { ShoppingCartOutlined } from "@ant-design/icons";
const Products = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleCreateProductClick = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onDelete = (itemToDelete) => {
    const updatedProducts = data.filter((item) => item.id !== itemToDelete.id);
    setData(updatedProducts);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      if (!response.ok) {
        throw new Error("Response is not ok");
      }
      const { data } = await response.json();
      setData(data.product);
    } catch (err) {
      console.log("Error in fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <div>
      <Row justify="end">
        <Col>
          <Button
            type="primary"
            className="product-button"
            onClick={handleCreateProductClick}
          >
            <ShoppingCartOutlined />
            Add Product
          </Button>
          <ProductForm
            visible={modalVisible}
            handleCancel={handleModalCancel}
          />
        </Col>
      </Row>
      
      <Row>
        {data.map((item, index) => (
          <Col key={index} style={{ marginTop: "1.5rem" }}>
            <ProductCard item={item} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
