import React from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
  Image,
  Alert,
  Spin,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../assets/logo 2.png";
import useLogin from "../../hooks/useLogin";
const { useToken } = theme;

const Login = () => {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();
  const { loginUser, loading, error } = useLogin();
  const handleLogin = (values) => {
    loginUser(values);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: screens.md
            ? `${token.paddingXL}px`
            : `${token.paddingXL}px ${token.padding}px`,
          width: "400px",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: token.marginXL }}>
          <Image preview={false} width={55} src={logo} />
          <Typography.Title
            style={{
              fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
            }}
          >
            Log In
          </Typography.Title>
          <Typography.Text>Welcome back !</Typography.Text>
          <Typography.Text>
            <br />
            Please enter your details below to sign in.
          </Typography.Text>
        </div>
        <Form
          name="signin"
          layout="vertical"
          requiredMark="optional"
          autoComplete="on"
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {error && (
            <Alert
              description={error}
              type="error"
              showIcon
              closable
              style={{ margin: "10px" }}
            />
          )}

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              block
              type={`${loading ? "" : "primary"}`}
              htmlType="submit"
            >
              {loading ? <Spin /> : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
