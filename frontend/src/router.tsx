import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Lookbook from "./pages/Lookbook";
import About from "./pages/About";
import Process from "./pages/Process";
import Collab from "./pages/Collab";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "collections", element: <Collections /> },
      { path: "lookbook", element: <Lookbook /> },
      { path: "about", element: <About /> },
      { path: "process", element: <Process /> },
      { path: "collab", element: <Collab /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <Orders /> },
      { path: "account", element: <Orders /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
