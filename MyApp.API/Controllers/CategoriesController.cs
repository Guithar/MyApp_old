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
    public class CategoriesController: ControllerBase
    {
        
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public CategoriesController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
                
        }

  [HttpGet]
            public async Task <ActionResult<IEnumerable<ProductCategoryForListDto>>> GetCategories()
            {  

                var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
                var categories = await _repo.GetCategories( currentTenantId);
                if (categories == null)
                    return NotFound();
                var CategoriesToReturn=  _mapper.Map<IEnumerable<ProductCategoryForListDto>>(categories);
                return new List<ProductCategoryForListDto> (CategoriesToReturn);
               
            }
    }
}