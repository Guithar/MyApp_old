// To generate json file at https://next.json-generator.com/
[
    {
      'repeat(3)': {
    
        Name: '{{company().toUpperCase()}}',
        NIF: 'B{{floating(45000, 99999999, 0, "00000000")}}',
        Host(tags) {
        return `${this.Name}${tags.domainZone()}`.toLowerCase();
      },
        Plan(tags) {
          const fruits = ['free','basic', 'premium'];
          return fruits[tags.integer(0, fruits.length - 1)]; 
        }
      }
    }
  ]