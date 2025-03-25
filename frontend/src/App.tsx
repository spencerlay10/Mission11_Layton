import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import BooksPage from "./pages/BooksPage";
import CartPage from "./pages/CartPage";
import PurchasePage from "./pages/PurchasePage";

// Routes are set up
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage/>} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/purchase/:title/:bookID/:price" element={<PurchasePage />} /> {/*passes the proper params needed*/}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;