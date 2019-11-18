using System;
using MyApp.API.Models;

namespace MyApp.API.Dtos
{
    public class AssetForDetailedDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int TenantId { get; set; }
        public string ClientCompany { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public bool? IsActive { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
        public int ProductId { get; set; }
        public ProductForListDto product { get; set; }

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