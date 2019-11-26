using System;
using MyApp.API.Models;

namespace MyApp.API.Dtos
{
    public class ProductForDetailedDto
    {
                public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; } // TODO change name to CategoryId (migrations seeds)
        public virtual ProductCategory ProductCategory { get; set; }
    

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