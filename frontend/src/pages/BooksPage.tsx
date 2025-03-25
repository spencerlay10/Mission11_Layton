import "../App.css";
import { useState } from "react";
import CartSummary from "../components/CartSummary";
import BookList from "../components/BookList";
import WelcomeBand from "../components/WelcomeBand";
import CategoryFilter from "../components/CategoryFilter";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <CartSummary />
        <WelcomeBand />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories} // Retrieves the categories that are selected
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} /> {/*Uses the categories that are selected*/} 
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
