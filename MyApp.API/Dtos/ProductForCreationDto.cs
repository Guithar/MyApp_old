using System;

namespace MyApp.API.Dtos
{
    public class ProductForCreationDto
    {
        
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; } // TODO change name to CategoryId (migrations seeds)
    
      
 
    }
}