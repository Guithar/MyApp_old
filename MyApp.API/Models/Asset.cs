using System;

namespace MyApp.API.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public int clientId { get; set; }
        public virtual Client Client { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

    }
}