using System;

namespace MyApp.API.Dtos
{
    public class MaintScheduleAssetForUpdateDto
    {  
        public int AssetId { get; set; }
        public int MaintScheduleId { get; set; }
        public DateTime NextInspectionDate { get; set; }
         public bool IsActive { get; set; }
    }
}