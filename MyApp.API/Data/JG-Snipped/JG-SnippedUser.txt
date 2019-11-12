//To generate json file at https://next.json-generator.com/
[
  {
    'repeat(5)': {
    Username: '{{firstName("female")}}',
    Gender: 'female',
    DateOfBirth: '{{moment(this.date(new Date(1950, 0, 1), new Date())).format("YYYY-MM-DD")}}',
    Password: 'password',
    KnownAs: function(){ return this.Username; },
    Created:'{{moment(this.date(new Date(2014, 0, 1), new Date())).format("YYYY-MM-DD")}}',
    CreatedOn: function(){return this.Created; },
    LastActive: function(){return this.Created; },
    Introduction: '{{lorem(1, "paragraphs")}}',
    LookingFor: '{{lorem(1, "paragraphs")}}',
    Interests: '{{lorem(1, "sentences")}}',
    City: '{{city()}}',
    Country: '{{country()}}',
    TenantId:1,
    Photos: [
        {
          url: function(num) {
          return 'https://randomuser.me/api/portraits/women/' + num.integer(1,99) + '.jpg';
        },
        isMain: true,
        description: '{{lorem()}}'
      }
    ]
  }
 } 
]