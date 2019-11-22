namespace MyApp.API.Dtos
{
    public class ProductForMaintListDto
    {
      
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; }
        public string ProductCategoryName { get; set; }
    }
}