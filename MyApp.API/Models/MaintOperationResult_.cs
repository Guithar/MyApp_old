using System;

namespace MyApp.API.Models
{
    public class MaintOperationResult_
    {
        public int MaintResultId { get; set; }
        public virtual MaintResult MaintResult { get; set; }
        public int MaintOperationId { get; set; }
        public virtual MaintOperation MaintOperation { get; set; }
        public string Result { get; set; }
        public string Observations { get; set; }
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