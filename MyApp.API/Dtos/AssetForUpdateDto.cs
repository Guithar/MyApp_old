using System;

namespace MyApp.API.Dtos
{
    public class AssetForUpdateDto
    {
        
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public bool? IsActive { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } 
                          // Audit Fields
         public bool? IsDeleted { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int DeletedBy { get; set; }
    }
}