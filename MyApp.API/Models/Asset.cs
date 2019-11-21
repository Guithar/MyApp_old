using System;
using System.Collections.Generic;

namespace MyApp.API.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime? InstalledDate { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public virtual ICollection<MaintScheduleAsset> MaintScheduleAssets { get; set; }

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