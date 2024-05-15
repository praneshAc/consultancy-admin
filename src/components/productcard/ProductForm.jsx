import React, { useState, useEffect } from "react";
import { Modal, message, Button, Typography, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const { Dragger } = Upload;

const ProductForm = ({ visible, handleCancel }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productOriginalPrice, setProductOriginalPrice] = useState(null);
  const [productName, setProductName] = useState(null);
  const [showDragger, setShowDragger] = useState(true);

  useEffect(() => {
    if (!visible) {
      setUploadedFile(null);
      setShowDragger(true);
    }
  }, [visible]);

  const handleUploadChange = (info) => {
    const { originFileObj } = info.file;
    setUploadedFile(originFileObj);
    setFile(originFileObj);
    setShowDragger(false);
  };

  const handleOk = async () => {
    console.log(file);
    if (file && productDescription && productName && productOriginalPrice) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", productDescription);
        formData.append("price", productOriginalPrice);
        formData.append("name", productName);
        console.log(formData.file);
        console.log(productDescription);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/addProduct`,
          {
            method: "POST",
            body: formData,
          }
        );
        const res = await response.json();
        if (res.status === "success") {
          message.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 1800);
        } else {
          message.error(res.message);
        }
        console.log(res);
      } catch (err) {
        message.error(`${err}`);
        console.log(err);
      }
      handleCancel();
    } else {
      message.error("Please upload a file and provide a valid description.");
    }
  };

  const handleButtonCancel = () => {
    setUploadedFile(null);
    setProductDescription(null);
    setShowDragger(true);
    handleCancel();
  };

  return (
    <Modal
      title="Upload Product Image"
      open={visible}
      onCancel={handleButtonCancel}
      footer={null}
    >
      {showDragger && (
        <ImgCrop showGrid aspect={5 / 4}>
          <Dragger onChange={handleUploadChange} showUploadList={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </ImgCrop>
      )}
      {uploadedFile && (
        <>
          <div style={{ textAlign: "center" }}>
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded File"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <Typography.Title level={5}>Product Name</Typography.Title>
            <Input
              placeholder="Product Discount Price"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <Typography.Title level={5}>Product Price</Typography.Title>
            <Input
              placeholder="Product Original Price"
              onChange={(e) => setProductOriginalPrice(e.target.value)}
            />
          </div>

          <div>
            <Typography.Title level={5}>Product Description</Typography.Title>
            <Input
              count={{
                show: true,
                max: 600,
              }}
              placeholder="Product Description"
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
        </>
      )}

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button onClick={handleButtonCancel} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ProductForm;
