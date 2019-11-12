using System;
using System.Collections.Generic;

namespace MyApp.API.Models
{
    public class Tenant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NIF { get; set; }
        public string Host { get; set; }
        public string Plan { get; set; }
        public virtual ICollection<User> User { get; set; }
        public virtual ICollection<Client> Client { get; set; }

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