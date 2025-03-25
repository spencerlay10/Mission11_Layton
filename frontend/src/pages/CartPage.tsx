import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Your cart</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-4">
            <div className="card-body"></div>
            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <ul className="list-unstyled">
                {cart.map((item: CartItem) => (
                  <li
                    key={item.bookID}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    {item.title}: ${item.price.toFixed(2)} x {item.quantity}
                    <span> = ${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <hr />
            <h3 className="text-end">Total: ${totalAmount}</h3>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/books")}
              >
                Continue Browsing
              </button>
              <button className="btn btn-primary" disabled={cart.length === 0}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
