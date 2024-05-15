import "./App.css";

import AppHeader from "./components/Header";
import SideMenu from "./components/sidebar/SideBar";
import PageContent from "./components/PageContent/PageContent";
import Login from "./components/Login/Login";
import { useAuth } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customer from "./pages/Customer";
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={!isAuthenticated && <Login />} />
        </Routes>
      </Router>
      <div className="App">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <PageContent />
        </div>
      </div>
    </>
  );
}
export default App;
