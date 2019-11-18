using System;
using System.Collections.Generic;

namespace MyApp.API.Models
{
    public class Product
    {   
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ProductCategoryId { get; set; } // TODO change name to CategoryId (migrations seeds)
        public virtual ProductCategory ProductCategory { get; set; }
        public virtual ICollection<Asset> Assets { get; set; }

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