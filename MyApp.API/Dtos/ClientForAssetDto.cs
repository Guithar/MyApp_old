namespace MyApp.API.Dtos
{
    public class ClientForAssetDto
    {
            public int Id { get; set; }
        public int TenantId { get; set; } 
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
 
    }
}