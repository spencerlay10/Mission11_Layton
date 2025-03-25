import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const totalAmount = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCheckout = () => {
    clearCart(); // Clears cart
    setShowModal(false); // Close the modal
    setShowToast(true); // Show toast notification

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 5000);
  };

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
                  onClick={() => setShowModal(true)}
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

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Checkout</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to complete your purchase?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckout}
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bootstrap Toast Notification */}
      <div
        className={`toast position-fixed bottom-0 end-0 m-4 ${
          showToast ? "show" : "hide"
        }`}
        role="alert"
        style={{ zIndex: 1050 }}
      >
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
        <div className="toast-body">
          🎉 Thank you for your purchase! A receipt will be sent to your email.
        </div>
      </div>
    </div>
  );
}

export default CartPage;