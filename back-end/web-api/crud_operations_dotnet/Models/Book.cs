﻿namespace crud_operations_dotnet.Models
{
    public class Book
    {
        public int Id { get; set; } 
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public int YearPublished { get; set; }
    }
}
