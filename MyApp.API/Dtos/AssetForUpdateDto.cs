using System;

namespace MyApp.API.Dtos
{
    public class AssetForUpdateDto
    {
        public int ClientId { get; set; }
        public int TenantId {get;set;}
    
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public bool? IsActive { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
         public int ProductId { get; set; }
                          

    }
}