import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Shows a cart summary in the top corner of the screen
const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price*item.quantity, 0);
  
    return (
      <div
        className="cart-summary"
        onClick={() => navigate("/cart")}
      >
        🛒 <strong>${totalAmount.toFixed(2)}</strong>
      </div>
    );
  };
  
  export default CartSummary;
  