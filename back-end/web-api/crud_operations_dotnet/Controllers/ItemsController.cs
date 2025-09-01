using crud_operations_dotnet.Data;
using crud_operations_dotnet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace crud_operations_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly CrudContext _context;
        public ItemsController(CrudContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            return Ok(await _context.Items.ToListAsync());
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetOneItem(int id)
        {
            return Ok(await _context.Items.FindAsync(id));
        }

        // POST api/<ItemsController>
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item newItem)
        {
            if(newItem == null)
            {
                return BadRequest("Item is null.");
            }
            _context.Items.Add(newItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOneItem), new { id = newItem.Id }, newItem);
        }

        // PUT api/<ItemsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Item newItem)
        {
            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem == null)
            {
                return NotFound("Item not found.");
            }
            try
            { 
                existingItem.Name = newItem.Name;
                existingItem.Description = newItem.Description;
                existingItem.Price = newItem.Price;
                existingItem.Quantity = newItem.Quantity;
                existingItem.CategoryId = newItem.CategoryId;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NoContent();
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not found.");
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
