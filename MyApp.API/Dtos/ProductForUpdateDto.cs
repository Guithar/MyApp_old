using System;

namespace MyApp.API.Dtos
{
    public class ProductForUpdateDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; }

               // Audit Fields
        public bool? IsActive { get; set; }
     

    }
}