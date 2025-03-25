import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import WelcomeBand from "../components/WelcomeBand";

function PurchasePage() {
  const { title, bookID, price, quantity } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No Book Found",
      price: Number(price),
      quantity: Number(quantity),
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <div className="container mt-4">
        <WelcomeBand />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-4">
              <div className="card-header">
                <h2>Purchase {title}</h2>
              </div>
              <div className="card-body">
                {price !== undefined ? (
                  <p>Price: ${Number(price).toFixed(2)}</p>
                ) : (
                  <p className="text-danger">Error: Price not found.</p>
                )}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                    disabled={!price}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchasePage;
