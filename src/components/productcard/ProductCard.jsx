import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Card,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Space,
} from "antd";
const { Meta } = Card;
const { Text } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductCard = ({ item, onDelete }) => {
  const [form] = Form.useForm();
  const { _id, name, description, image, price } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, SetInitialValues] = useState({
    productName: name,
    productDescription: description,
    productPrice: price,
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = () => {
    setEditModal(true);
  };

  const handleEditOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const formData = {
        name: values.productName,
        description: values.productDescription,
        price: values.productPrice,
      };
      const productId = _id;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const { data } = await response.json();

      if (response.ok) {
        message.success("Product updated successfully");
        form.resetFields();
        SetInitialValues({
          productName: data.updatedProduct.name,
          productDescription: data.updatedProduct.description,
          productPrice: data.updatedProduct.price,
        });
        // Do any other necessary operations after successful update
      } else {
        message.error("Failed to update product");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
    setEditModal(false);
  };
  const handleEditCancel = () => {
    setEditModal(false);
  };

  const handleOk = async () => {
    try {
      const deleteProduct = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${_id}`,
        { method: "DELETE" }
      );
      if (deleteProduct.ok) {
        onDelete(item);
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      console.log("Failed to delete ", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      cover={<img alt="example" src={image} />}
      actions={[
        <EditOutlined
          key="edit"
          onClick={showEditModal}
          style={{ color: "#0000FF" }}
        />,
        <DeleteOutlined
          key="ellipsis"
          onClick={showModal}
          style={{ color: "red" }}
        />,
      ]}
      className="product-card" 
    >
      <Meta title={name} description={description} />
      <br />
      <Text>
        &#8377;
        {price}
      </Text>
      <Modal
        title={
          <div>
            <ExclamationCircleFilled style={{ color: "red" }} /> Are you sure
            want to delete this ?
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Modal open={editModal} onCancel={handleEditCancel} footer={false}>
        <Form
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          initialValues={initialValues}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="productDescription"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="productPrice"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Product Image"
            name="productImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card" maxCount={1}>
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 14 }}>
            <Space direction="horizontal">
              <Button type="primary" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={handleEditOk}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
export default ProductCard;
