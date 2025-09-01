namespace crud_operations_dotnet.Models
{
    public class Category
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; }
        = string.Empty;
        public List<Item> ?Items { get; set; } = new List<Item>();
    }
}
