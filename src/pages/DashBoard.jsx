import DashboardCard from "../components/dashboard/DashBoarsCard";
import { Row, Col, Table } from "antd";
import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import PieChart from "../components/OrderStatusChart";
import BarGraph from "../components/Revenue";
function Dashboard() {
  const products = [
    { label: "Product A", value: 50 },
    { label: "Product B", value: 30 },
    { label: "Product C", value: 20 },
  ];
  const data = [
    { year: "2021", value: 3 },
    { year: "2022", value: 4 },
    { year: "2023", value: 3.5 },
    { year: "2024", value: 5 },
  ];

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Bill Amount",
      dataIndex: "billAmount",
      key: "billAmount",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
  ];
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
  };
  const [statData, setStatData] = useState("");
  const [userData, setUserData] = useState();
  useEffect(() => {
    const countStat = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/statistics`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStatData(data.statistics);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/admin/customers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Users");
        }
        const { user } = await response.json();

        const formattedData = user.map((user) => {
          // Calculate total bill amount for orders
          const totalBillAmount = user.orders.reduce(
            (total, order) => total + order.billAmount,
            0
          );

          return {
            key: user._id,
            customerName: user.name,
            billAmount: `₹${totalBillAmount}`,
            orders: user.orders.length,
          };
        });
        setUserData(formattedData);
      } catch (error) {
        console.log("Error fetching Users:", error);
      }
    };
    countStat();
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={[16, 16]}>
        <DashboardCard
          icon={<UserOutlined className="icon" />}
          title="No of Customers"
          value={statData.totalUsers}
        />
        <DashboardCard
          icon={<ShoppingOutlined className="icon" />}
          title="No of Products"
          value={statData.totalProducts}
        />
        <DashboardCard
          icon={<OrderedListOutlined className="icon" />}
          title="No of orders"
          value={statData.totalOrders}
        />

        <DashboardCard
          icon={<ShoppingCartOutlined className="icon" />}
          title="Total revenue"
          value={` ₹${statData.totalRevenue}`}
        />
      </Row>
      <Row style={{ marginTop: "35px" }}>
        <Col span={12} height={50}>
          <BarGraph />
        </Col>
        <Col span={12}>
          {/* <Table dataSource={userData} columns={columns} /> */}
          <PieChart data={statData.orderStatus} />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
