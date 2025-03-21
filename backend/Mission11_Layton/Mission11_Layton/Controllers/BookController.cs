using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Layton.Data;

namespace Mission11_Layton.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1) // Sets the page size and number automatically unless something is selected
        {
            var something = _bookContext.Books
                .Skip((pageNum - 1) * pageSize) // Skips the proper amount
                .Take(pageSize) // Displays the proper amount
                .ToList();

            var totalNumBooks = _bookContext.Books.Count(); 

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
    }
}
