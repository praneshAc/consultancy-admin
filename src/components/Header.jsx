import logo from "../assets/img/logo 1.png";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const AppHeader = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="AppHeader">
      <img src={logo} alt="" width={150} />
      <Button
        type="link"
        onClick={handleLogout}
        icon={<LogoutOutlined />}
        className="logoutButton"
        style={{
          color: "#184E89",
          border: "none",
          textDecoration: "underline",
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AppHeader;
