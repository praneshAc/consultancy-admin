import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);

        login(data.token, data.user);
        setTimeout(() => {
          navigate("/"); // Redirect to home page after 4 seconds
        }, 750);
      } else if (res.status === 401) {
        setError(data.message);
      } else {
        message.error("Login failed");
      }
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, loginUser };
};
export default useLogin;
