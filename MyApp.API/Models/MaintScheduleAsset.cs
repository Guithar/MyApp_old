using System;
using System.Collections.Generic;

namespace MyApp.API.Models
{
    public class MaintScheduleAsset
    {
        public int AssetId { get; set; }
        public int MaintScheduleId { get; set; }
        public DateTime NextInspectionDate { get; set; }
        public virtual Asset Asset { get; set; }
        public virtual MaintSchedule MaintSchedule { get; set; }
        public virtual ICollection<MaintResult> MaintResults { get; set; }
        public int TenantId { get; set; }

            // Audit Fields
         public bool? IsActive { get; set; }

         // Only hard delete
        // public bool? IsDeleted { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int DeletedBy { get; set; }

    }
}