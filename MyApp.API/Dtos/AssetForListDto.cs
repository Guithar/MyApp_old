using System;
using System.Collections.Generic;

namespace MyApp.API.Dtos
{
    public class AssetForListDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public ProductForMaintListDto product{ get; set; }
        public ClientForAssetDto client { get; set; }
        public ICollection<MaintScheduleAssetDto>  Inspections { get; set; }

            // Audit Fields
         public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int DeletedBy { get; set; }
    }
}