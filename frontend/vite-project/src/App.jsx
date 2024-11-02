import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Navbar from "./Design/Shared/NavBar";
import Footer from "./Design/Shared/Footer";
import Discover from "./Pages/Discover/Discover";
import DiscoverByItem from "./Pages/DiscoverByItem/DiscoverByItem";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Favorite from "./Pages/Favorite/Favorite";
import Admin from "./Pages/Admin/Admin";
import CreateProductPage from "./Pages/Admin/CreateProductPage";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminProductsCategory from "./Pages/Admin/AdminProductsCategory";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCategory from "./Pages/Admin/AdminCategory";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminProductUpdate from "./Pages/Admin/AdminProductUpdate";
import { useLocation } from "react-router-dom";
import Forbidden from "./Pages/Forbidden/Forbidden";
import NoMatch from "./Pages/NoMatch/NoMatch";
function App() {
  const location = useLocation();
  const hideFooterRoutes = ["/admin", "/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<DiscoverByItem />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create/product" element={<CreateProductPage />} />
          <Route path="product/:id/update" element={<AdminProductUpdate />} />

          <Route path="products" element={<AdminProducts />} />
          <Route
            path="products/:id/category"
            element={<AdminProductsCategory />}
          />
          <Route path="categories" element={<AdminCategory />} />
        </Route>
      </Routes>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;
