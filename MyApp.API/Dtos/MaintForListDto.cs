using System;
using System.Collections.Generic;
using MyApp.API.Dtos;

namespace MyApp.API.Models
{
    public class MaintForListDto
    {
        public int AssetId { get; set; }
        public int MaintScheduleId { get; set; }
        public int TenantId { get; set; }
  
        public ProductForMaintListDto product { get; set; }
        public string Location { get; set; }
        public int Quantity { get; set; }
        
        public string MaintScheduleName { get; set; }
        public int MonthsInterval { get; set; }
        public DateTime ManufacturedDate { get; set; }
        public DateTime LastRev { get; set; }
        public DateTime NextRev { get; set; }
        public string LastResult { get; set; }

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