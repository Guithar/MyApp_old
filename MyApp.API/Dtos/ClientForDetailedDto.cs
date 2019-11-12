using System;

namespace MyApp.API.Dtos
{
    public class ClientForDetailedDto
    {
        //information of the client
        public int Id { get; set; }
        public int TenantId { get; set; } 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Company { get; set; }
        public string NIF { get; set; }
        public string JobTitle { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
         public string State_Province { get; set; }
        public string ZIP_PostalCode { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Observations { get; set; }

        // Audit Fields
         public bool? IsDeleted { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public int DeletedBy { get; set; }

    }
}