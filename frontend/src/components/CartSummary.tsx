import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Shows a cart summary in the top corner of the screen
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const bookNum = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="cart-summary" onClick={() => navigate("/cart")}>
        <div>
          🛒 <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        <div>
          <strong>{bookNum} Books</strong>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
