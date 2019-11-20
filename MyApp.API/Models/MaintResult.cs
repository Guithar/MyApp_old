using System;

namespace MyApp.API.Models
{
    public class MaintResult
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public int AssetId { get; set; }
        public virtual Asset Asset { get; set; }
        public int MaintScheduleId { get; set; }
        public virtual MaintSchedule MaintSchedule { get; set; }
        public DateTime ExecutedOn { get; set; }
        public int ExecutedBy { get; set; }
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