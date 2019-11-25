[
  {
    'repeat(5)': {//MaintSchedule
    	Index: '{{index(1)}}',
      marca:'***********************************************************',
    	TenantId:1,
      	ProductCategoryId: '{{integer(0, 15)}}',
      	ProductId:'',
       	_categoria(tags) {
      	const Categories = ['Extintores', 'Bocas de Incendio', 'Detectores de incendios','Aerosoles', 'Extinción por Rociadores', 'Extinción por gas','Abastecimiento de agua', 'Detectores de CO', 'Ventilación','Extinción por Espuma', 'Señalización', 'Puertas Cortafuego','Hidrantes y columna seca', 'Extinción por Polvo', 'Agua nebulizada'];
      return Categories[this.ProductCategoryId];
    },
      	_CodCategoria(tags) {
      	const Categories = ['EXT', 'BIE', 'DET','AER', 'ROC', 'GAS','ABA', ' CO', 'VEN','ESP', 'SEÑ', 'PCF','HID', 'POL', 'NEB'];
      return Categories[this.ProductCategoryId];
    },
    	
      	_indicePeriodo:'{{integer(0, 6)}}',
    	MonthsInterval: function (tags) {
      		var  Months = [1, 3, 6, 12, 24, 36, 60];
      		return Months[this._indicePeriodo];
    		},
     
    	Description: function (tags) {
      		var  Months = ['mensual', 'trimestral', 'semestral', 'anual', 'bianual', 'trianual', 'quinquenal'];
      		return 'Revisión ' + Months[this._indicePeriodo] + ' de ' + this._categoria ;
    		},
     	 Name: function (tags) {
            return (this.Description).toUpperCase();
          },
      IsActive:true,
      IsDelete:false,
//****************************************
     	MaintScheduleAssets: [
          {
          'repeat(10)': {
            
            Ide:  '{{index(0)}}',
  
             AssetId_con_marca________________________________________: function (tags,parent) {
      		return parent.Index+this.Ide+9*(parent.Index-1);
    		},
             AssetId: function (tags,parent) {
      		return parent.Index+this.Ide+9*(parent.Index-1);
    		},
            MaintScheduleId: function (tags,parent) {
      		var  Months = [1, 2,3, 4, 5, 6, 7,8,9,10,11,12,13,14,15];
      		return Months[parent.Index-1];
    		},
            TenantId:1,
            IsActive:true,
      		IsDelete:false,
             //****************************************
            MaintResults: [
              {
                'repeat(2)': {
                  Index: '{{index(1)}}',   
                  AssetId: function (tags,parent) {
      		return parent.AssetId;
    		},
                  MaintScheduleId: function (tags,parent) {
      		return parent.MaintScheduleId;
    		},
                  TenantId:1,
                  
                   ExecutedOn: function (tags,parent) {
                    
                    return 2019-this.Index + '-11-19 11:17:43';
                  },
                   NextRevision: function (tags,parent) {
                    
                    return 2020-this.Index + '-11-19 11:17:43';
                  },
                  Observations: function (tags) {
                    var  verbo = ['Verificado ', 'Mal estado de ', 'Requiere limpieza de ', 'No se ha realizado la reposición de ', 'Fallo en ', 'Estado incorrecto de ', 'Prueba correcta de ', 'Sustitución de ', 'Desconexión de ', 'Aviso a responsable de ', 'Retirada de '];
                    var cd =['los sistemas','los sensores','los pilotos indicadores','las conexiones','las instalación eléctrica','los equipos del sistema','las sirenas', 'todas las salidas', 'la alimentación eléctica', 'voltaje y corriente', 'las baterías', 'equipos averiados'];      
                    return  verbo[tags.integer(0, verbo.length -1)] + cd[tags.integer(0, cd.length -1)] ;
                  },
                  Result: function (tags) {
                    var estado = ['Y','N','P'];
                    return estado[tags.integer(0, estado.length -1)];
                  },
                  IsActive:true,
                  IsDelete:false
                }
              }
            ],
              }
          }
    	],
     
//****************************************
     	MaintOperations: [
       {
              'repeat(9)': {
                Index: '{{index(1)}}',
                TenantId:1,
                 MaintScheduleId: function (tags,parent) {
      		var  Months = [1, 2,3, 4, 5, 6, 7,8,9,10,11,12,13,14,15];
      		return Months[parent.Index-1];
    		},
               Code: function (tags,parent) {
      		return parent._CodCategoria + '.0' + this.Index ;
    		},
                Position: '{{index(1)}}',
                
                Description: function (tags) {
      		var  verbo = ['Verificar ', 'Comprobar estado de ', 'Limpieza de ', 'Reposición de ', 'Restaurar ', 'Medir ', 'Prueba de ', 'Sustitución de ', 'Desconectar previamente ', 'Aviso previo a la prueba de ', 'Retirar '];
            var cd =['los sistemas','los sensores','los pilotos indicadores','las conexiones','las instalación eléctrica','los equipos del sistema','las sirenas', 'todas las salidas', 'la alimentación eléctica', 'voltaje y corriente', 'las baterías', 'equipos averiados'];      
      		return  verbo[tags.integer(0, verbo.length -1)] + cd[tags.integer(0, cd.length -1)] ;
    		},
     	 	Name: function (tags) {
            return (this.Description).toUpperCase();
          },
            IsActive:true,
      		IsDelete:false    
            }
         }
      ],

  }
  }
]