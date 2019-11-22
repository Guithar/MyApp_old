using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Data;
using MyApp.API.Dtos;
using MyApp.API.Helpers;
using MyApp.API.Models;

namespace MyApp.API.Controllers
{
        
    [Authorize]
     [Route("api/clients/{clientId}/[controller]")]
    [ApiController]
    public class MaintsController: ControllerBase
    {
        
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public MaintsController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
                
        }
        [HttpGet]
        public async Task <ActionResult<IEnumerable<MaintForListDto>>> GetMaints(int clientId)
        {   // -filters:
            // by MaintScheduleId, 
            // by ClientId, 
            // by AssetId
            // - orderBy:
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maints = await _repo.GetMaints(clientId, currentTenantId);
            if (maints == null)
                return NotFound();
            var maintsToReturn= _mapper.Map<IEnumerable<MaintForListDto>>(maints);
            return new List<MaintForListDto>(maintsToReturn);
            
        }

        [HttpGet("{id}", Name="GetMaint")]
        
        public async Task<ActionResult<ProductForListDto>> GetMaint(int id)
        {   // by AssetId and MaintScheduleId
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var productFromRepo = await _repo.GetProduct(id,currentTenantId);
            if(productFromRepo==null)
            return NotFound();
            var productToReturn= _mapper.Map<ProductForListDto>(productFromRepo);
            return productToReturn;
            
        }
    }
}