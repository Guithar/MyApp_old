using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Data;
using MyApp.API.Dtos;
using MyApp.API.Models;

namespace MyApp.API.Controllers
{
        
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public ProductsController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
                
        }

  [HttpGet]
            public async Task <ActionResult<IEnumerable<ProductCategoryForListDto>>> GetCategoriesAndProducts()
            {  
                var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
                var categoriesAndProducts = await _repo.GetCategoriesAndProducts( currentTenantId);
                if (categoriesAndProducts == null)
                    return NotFound();
                var ProductsToReturn= _mapper.Map<IEnumerable<ProductCategoryForListDto>>(categoriesAndProducts);
                return new List<ProductCategoryForListDto>(ProductsToReturn);
               
            }
            [HttpGet("{id}", Name="GetProduct")]
            
            public async Task<ActionResult<ProductForListDto>> GetProduct(int id)
            {   
                var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
                var productFromRepo = await _repo.GetProduct(id,currentTenantId);
                if(productFromRepo==null)
                return NotFound();
                var productToReturn= _mapper.Map<ProductForListDto>(productFromRepo);
                return productToReturn;
              
            }
    }
}