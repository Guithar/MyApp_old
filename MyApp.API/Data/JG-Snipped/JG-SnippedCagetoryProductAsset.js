[
  {
   'repeat(5)': {
 
     Ide: '{{index(1)}}',
     TenantId:1,
     Name(tags) {
       const Categories = ['Extintores', 'Bocas de Incendio', 'Detectores de incendios','Aerosoles', 'Extinción por Rociadores', 'Extinción por gas','Abastecimiento de agua', 'Detectores de CO', 'Ventilación','Extinción por Espuma', 'Señalización', 'Puertas Cortafuego','Hidrantes y columna seca', 'Extinción por Polvo', 'Agua nebulizada'];
       return Categories[this.Ide];
     },
     Description:function (tags, parent) {
     return `${this.Name}` ;
       },
     Products: [
       {
         'repeat(5)': {
            Ide: '{{index(1)}}',
           TenantId:1,
            Location:'{{city()}}',
         Name:function (tags, parent) {
     return `${parent.Name} tipo ${this.Location}` ;
       },
         Description:function (tags, parent) {
     return `${this.Name}` ;
       },
           CategoryId:function (tags, parent) {
     return parent.Ide;
       },
           Assets: [
       {
         'repeat(2)': {
           TenantId:1,
         Name:function (tags, parent) {
     return parent.Name;
       },
         Description:'{{random("blue", "brown", "green")}}',
           ClientId:'{{integer(1, 11, 00)}}',
           Location:'{{city()}}',
           Quantity:1,
           IsActive:true,
           ManufacturedDate:'{{moment(new Date(2010, 1, 1), new Date()).format("YYYY-MM-DD hh:mm:ss")}}',
       InstalledDate: '{{moment(new Date(2010, 1, 1), new Date()).format("YYYY-MM-DD hh:mm:ss")}}',
          CreatedDate:'{{moment(new Date()).format("YYYY-MM-DD hh:mm:ss")}}',
           productId:function (tags, parent) {
     return parent.Ide;
       }
         }
       }
   ]
           
         }
       }
   ],
           
 }
 }
 ]