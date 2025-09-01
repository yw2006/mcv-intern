using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace crud_operations_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class addItemsandCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Devices and gadgets", "Electronics" },
                    { 2, "Apparel for men and women", "Clothing" },
                    { 3, "Tables, chairs, and home furniture", "Furniture" },
                    { 4, "Fitness and outdoor gear", "Sports & Outdoors" },
                    { 5, "Smartwatches, fitness trackers, and wearable technology", "Wearables" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "CategoryId", "Description", "Name", "Price", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, "Ergonomic wireless mouse with 2.4GHz connectivity.", "Wireless Mouse", 250m, 30 },
                    { 2, 1, "RGB backlit mechanical keyboard with blue switches.", "Mechanical Keyboard", 1200m, 15 },
                    { 3, 2, "Over-ear gaming headset with noise cancellation and mic.", "Gaming Headset", 850m, 20 },
                    { 4, 2, "Fast charging 45W USB-C wall adapter.", "USB-C Charger", 400m, 50 },
                    { 5, 3, "Adjustable aluminum laptop stand for better posture.", "Laptop Stand", 300m, 25 },
                    { 6, 3, "Flexible tripod with universal phone holder.", "Smartphone Tripod", 150m, 40 },
                    { 7, 4, "1TB portable USB 3.0 external hard drive.", "External Hard Drive", 1500m, 10 },
                    { 8, 4, "Portable waterproof Bluetooth speaker with deep bass.", "Bluetooth Speaker", 600m, 35 },
                    { 9, 5, "Water-resistant fitness tracker with heart rate monitor.", "Fitness Tracker", 750m, 22 },
                    { 10, 5, "Touchscreen smartwatch with sleep tracking and notifications.", "Smartwatch", 1800m, 12 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CategoryId",
                table: "Items",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
