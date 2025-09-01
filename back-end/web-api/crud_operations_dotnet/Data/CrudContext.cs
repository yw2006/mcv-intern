using crud_operations_dotnet.Models;
using Microsoft.EntityFrameworkCore;

namespace crud_operations_dotnet.Data
{
    public class CrudContext : DbContext
    {
        public CrudContext(DbContextOptions<CrudContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Books
            modelBuilder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "1984", Author = "George Orwell", YearPublished = 1949 },
                new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", YearPublished = 1960 },
                new Book { Id = 3, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", YearPublished = 1925 }
            );

            // Seed Items
            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, Name = "Wireless Mouse", Description = "Ergonomic wireless mouse with 2.4GHz connectivity.", Price = 250, Quantity = 30, CategoryId = 1 },
                new Item { Id = 2, Name = "Mechanical Keyboard", Description = "RGB backlit mechanical keyboard with blue switches.", Price = 1200, Quantity = 15, CategoryId = 1 },
                new Item { Id = 3, Name = "Gaming Headset", Description = "Over-ear gaming headset with noise cancellation and mic.", Price = 850, Quantity = 20, CategoryId = 2 },
                new Item { Id = 4, Name = "USB-C Charger", Description = "Fast charging 45W USB-C wall adapter.", Price = 400, Quantity = 50, CategoryId = 2 },
                new Item { Id = 5, Name = "Laptop Stand", Description = "Adjustable aluminum laptop stand for better posture.", Price = 300, Quantity = 25, CategoryId = 3 },
                new Item { Id = 6, Name = "Smartphone Tripod", Description = "Flexible tripod with universal phone holder.", Price = 150, Quantity = 40, CategoryId = 3 },
                new Item { Id = 7, Name = "External Hard Drive", Description = "1TB portable USB 3.0 external hard drive.", Price = 1500, Quantity = 10, CategoryId = 4 },
                new Item { Id = 8, Name = "Bluetooth Speaker", Description = "Portable waterproof Bluetooth speaker with deep bass.", Price = 600, Quantity = 35, CategoryId = 4 },
                new Item { Id = 9, Name = "Fitness Tracker", Description = "Water-resistant fitness tracker with heart rate monitor.", Price = 750, Quantity = 22, CategoryId = 5 },
                new Item { Id = 10, Name = "Smartwatch", Description = "Touchscreen smartwatch with sleep tracking and notifications.", Price = 1800, Quantity = 12, CategoryId = 5 }
            );

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", Description = "Devices and gadgets" },
                new Category { Id = 2, Name = "Clothing", Description = "Apparel for men and women" },
                new Category { Id = 3, Name = "Furniture", Description = "Tables, chairs, and home furniture" },
                new Category { Id = 4, Name = "Sports & Outdoors", Description = "Fitness and outdoor gear" },
                new Category { Id = 5, Name = "Wearables", Description = "Smartwatches, fitness trackers, and wearable technology" }
            );
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}
