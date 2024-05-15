import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/DashBoard";
import Products from "../../pages/Products";
import Orders from "../../pages/Orders";
import Customer from "../../pages/Customer";
import { useAuth } from "../../contexts/AuthContext";
function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated && <Dashboard />}></Route>

        <Route
          path="/products"
          element={isAuthenticated && <Products />}
        ></Route>
        <Route path="/orders" element={isAuthenticated && <Orders />}></Route>
        <Route
          path="/customers"
          element={isAuthenticated && <Customer />}
        ></Route>
      </Routes>
    </Router>
  );
}
export default AppRoutes;
