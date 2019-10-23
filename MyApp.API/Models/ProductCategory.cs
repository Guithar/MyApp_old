using System.Collections.Generic;

namespace MyApp.API.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public  string Description { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}