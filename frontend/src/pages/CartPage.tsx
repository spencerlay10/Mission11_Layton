import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart();
    const totalAmount = cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

      return (
        <div className="container mt-4">
          <h1 className="text-center mb-4">Your cart</h1>
          <div className="row justify-content-center">
            <div className="col-md-8 center-card">
              <div className="card mt-4">
                <div className="card-body">
                  {cart.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                  ) : (
                    <table className="cart-table">
                      <tbody>
                        {cart.map((item: CartItem) => (
                          <tr key={item.bookID}>
                            <td className="cart-item-title">{item.title}</td>
                            <td>${item.price.toFixed(2)} x {item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(item.bookID)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                    <button
                  onClick={() => {
                    clearCart();  // <-- Clears cart on checkout
                    alert("Thank you for your purchase! A receipt will be sent to your email."); // Optional confirmation
                  }}
                  className="btn btn-primary"
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  
  export default CartPage;