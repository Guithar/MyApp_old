using System;

namespace MyApp.API.Models
{
    public class AssetMaintSchedule
    {
        public int AssetId { get; set; }
        public int MaintScheduleId { get; set; }
        public virtual Asset Asset { get; set; }
        public virtual MaintSchedule MaintSchedule { get; set; }
        public int TenantId { get; set; }

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