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
        public virtual ICollection<Client> Client { get; set; }
    }
}