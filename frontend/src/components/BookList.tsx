// Imports
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // Hooks
  // Makes it possible to sort items and pagination
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

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

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/adminbooks")}>Admin Page</button>
      <div className="container mt-5">
        {/* Sorting controls */}
        <div className="d-flex justify-content-between mb-4 gap-3">
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
        <div className="book-list-grid row justify-content-center">
          {sortedBooks.map((b) => (
            <div
              key={b.isbn}
              className={`mb-4 ${sortedBooks.length === 1 ? "col-md-6" : "col-md-4 col-lg-3"}`}
            >
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
                      navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
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
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}

export default BookList;
