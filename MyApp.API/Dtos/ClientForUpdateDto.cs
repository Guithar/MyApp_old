using System;
using MyApp.API.Models;

namespace MyApp.API.Dtos
{
    public class ClientForUpdateDto
    {   //information of the client
        
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
        public int UserId { get; set; }

        //control of register
        public bool  IsDeleted { get; set; }
        public bool  IsActive { get; set; }      
        public DateTime LastModifiedDate { get; set; }
    }
}