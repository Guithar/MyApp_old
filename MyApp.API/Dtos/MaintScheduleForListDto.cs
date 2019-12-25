namespace MyApp.API.Dtos
{
    public class MaintScheduleForListDto
    {
        
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MonthsInterval { get; set; }
        public int ProductCategoryId { get; set; }
    

    }
}