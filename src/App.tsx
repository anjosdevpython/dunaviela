import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import HowToBuy from "./pages/HowToBuy";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loja" element={<Shop />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/sobrenos" element={<AboutUs />} />
              <Route path="/como-comprar" element={<HowToBuy />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <BottomNav />
          </div>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}
