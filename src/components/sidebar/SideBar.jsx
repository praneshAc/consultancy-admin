import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function SideMenu() {
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        items={[
          {
            label: <a href="/">Dashboard</a>,
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: <a href="/products">Product</a>,
            key: "/products",
            icon: <ShopOutlined />,
          },
          {
            label: <a href="/orders">Orders</a>,
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: <a href="/customers">Customer</a>,
            key: "/customers",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
