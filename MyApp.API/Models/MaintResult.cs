using System;

namespace MyApp.API.Models
{
    public class MaintResult
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public int AssetId { get; set; } // by convention: MaintScheduleAssetAssetId
        public int MaintScheduleId { get; set; }// by convention: MaintScheduleAssetMaintScheduleId
        public virtual MaintScheduleAsset MaintScheduleAsset { get; set; }

        public int ExecutedBy { get; set; }
        public DateTime ExecutedOn { get; set; }
        public string Observations { get; set; }
        public string Result { get; set; }

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