using System;

namespace MyApp.API.Dtos
{
    public class ProductCategoryForListDto
    {
        
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public  string Description { get; set; }

    }
}