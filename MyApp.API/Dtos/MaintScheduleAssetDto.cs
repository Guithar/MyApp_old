using System;

namespace MyApp.API.Dtos
{
    public class MaintScheduleAssetDto
    {
       
        public int MaintScheduleId { get; set; }
        public int ProductCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MonthsInterval { get; set; }
        public DateTime LastInspectionDate { get; set; }
        public DateTime NextInspectionDate { get; set; }
        public string LastResult { get; set; }
         public bool IsActive { get; set; }
        
    }
}