// Imports
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // Hooks
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 'asc' for ascending, 'desc' for descending
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`,
        {
          credentials: "include",
        }
      ); // Pulling from the backend

      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  // Function to sort books by title or any other field
  const handleSort = (field: keyof Book) => {
    const sorted = [...books].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setSortedBooks(sorted);
  };

  useEffect(() => {
    setSortedBooks(books); // Update the sorted books whenever books data changes
  }, [books]);

  return (
    <div className="container mt-5">
      {/* Sorting controls */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => handleSort("title")}
          >
            Sort by Title: {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
          <button
            className="btn btn-secondary ms-3"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Toggle Sort Order
          </button>
        </div>
      </div>

      {/* Display books in a grid */}
      <div className="row">
        {sortedBooks.map((b) => (
          <div key={b.isbn} className="col-md-4 mb-4">
            <div id="BookCard" className="card shadow-sm">
              <h5 className="card-header">{b.title}</h5>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <strong>Author: </strong>
                    {b.author}
                  </li>
                  <li>
                    <strong>Publisher: </strong>
                    {b.publisher}
                  </li>
                  <li>
                    <strong>ISBN: </strong>
                    {b.isbn}
                  </li>
                  <li>
                    <strong>Classification: </strong>
                    {b.classification}
                  </li>
                  <li>
                    <strong>Category: </strong>
                    {b.category}
                  </li>
                  <li>
                    <strong>Number of Pages: </strong>
                    {b.pageCount}
                  </li>
                  <li>
                    <strong>Price: </strong>${b.price}
                  </li>
                </ul>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/purchase/${b.title}/${b.bookID}`)
                  }
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        {/* Previous button */}
        <div className="d-flex">
          <button
            className={`btn btn-outline-primary ${pageNum === 1 ? "invisible" : ""}`}
            onClick={() => setPageNum(pageNum - 1)}
            aria-label="Previous"
          >
            Previous
          </button>
        </div>

        {/* Page numbers */}
        <div className="d-flex">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${pageNum === index + 1 ? "btn-primary active" : "btn-outline-primary"} me-2`}
              onClick={() => setPageNum(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next button */}
        <div className="d-flex">
          <button
            className={`btn btn-outline-primary ${pageNum === totalPages ? "invisible" : ""}`}
            onClick={() => setPageNum(pageNum + 1)}
            aria-label="Next"
          >
            Next
          </button>
        </div>
      </div>

      {/* Results per page */}
      <div className="mt-4">
        <label>
          Results per page:
          <select
            className="form-select ms-2"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookList;
