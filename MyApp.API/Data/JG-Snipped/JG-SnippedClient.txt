//To generate json file at https://next.json-generator.com/
[
  {
    'repeat(11)': {
      
     
    FirstName: '{{firstName()}}',
    LastName: '{{surname()}}',
    society: function (tags) {
      var soc = [', S.L.', ', S.A.', ', S.C.', ' & CIA',', C.B.'];
      return soc[tags.integer(0, soc.length - 1)];  },
    company_: '{{company().toUpperCase()}}',
    company(tags) {
        return   `${this.company_}${this.society}`;
      },
    NIF: 'B{{floating(45000, 99999999, 0, "00000000")}}',
    JobTitle: function (tags) {
      var titles = ['Administrativo', 'Gerente', 'Director Técnico', 'Responsable de mantenimiento','Director de RRHH','Ingeniero Jefe','Jefe Dpto. Técnico'];
      return titles[tags.integer(0, titles.length - 1)];  },
    Adress: '{{integer(100, 999)}} {{street()}},',
    
    City: ' {{city()}}',
    
    State_Province: '{{state()}}',
    
    ZIP_PostalCode: '{{integer(11000, 11999)}}',
    
    Country: '{{country()}}',
    
     email(tags) {
        return `${this.FirstName}.${this.LastName}@${this.company_}${tags.domainZone()}`.toLowerCase();
      },
    
    phone: '+1 {{phone()}}',
    
    Observations: '{{lorem(1, "paragraphs")}}',
    
    
    isDeleted: 'false',
    
    isActive: '{{bool()}}',
    
    registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("YYYY-MM-DD")}}',
    TenantId:'{{integer(1,2, 00)}}'
      }
    }
]