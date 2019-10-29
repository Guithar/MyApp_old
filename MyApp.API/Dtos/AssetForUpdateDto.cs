using System;

namespace MyApp.API.Dtos
{
    public class AssetForUpdateDto
    {
        
        // public int ClientId { get; set; }
        // public int ClientUserId { get; set; }
        // public string ClientCompany { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public bool? IsActive { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } 
    }
}