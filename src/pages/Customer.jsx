import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Customer = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/customers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Users");
        }
        const { user } = await response.json();
        console.log(user);

        const formattedData = user.map((user) => ({
          key: user._id,
          userName: user.name,
          email: user.email,
          contact: user.phone,
          address: `${user.address}, ${user.city}, ${user.pincode}`,
          orders: user.orders.length,
        }));
        setUserData(formattedData);
      } catch (error) {
        console.log("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
  ];

  return (
    <>
      <Table
        style={{ margin: "15px" }}
        columns={columns}
        dataSource={userData}
      />
    </>
  );
};

export default Customer;
