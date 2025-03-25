import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";

function PurchasePage() {
    const { title, bookID } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [price, setPrice] = useState<number>(0);
  
    const handleAddToCart = () => {
      const newItem: CartItem = {
        bookID: Number(bookID),
        title: title || "No Book Found",
        price,
      };
      addToCart(newItem);
      navigate("/cart");
    };
  
    return (
      <>
        <WelcomeBand />
        <h2>Purchase {title}</h2>
  
        <div>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(x) => setPrice(Number(x.target.value))}
          />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
  
        <button onClick={() => navigate(-1)}>Go Back</button>
      </>
    );
  }
  
  export default PurchasePage;
  