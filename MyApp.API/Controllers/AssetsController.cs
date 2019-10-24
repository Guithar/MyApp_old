using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Data;
using MyApp.API.Dtos;

namespace MyApp.API.Controllers
{
        [Authorize]
        [Route("api/clients/{clientId}/assets")]
        [ApiController]
        public class AssetsController : ControllerBase
        {
            private readonly IMyAppRepository _repo;
            private readonly IMapper _mapper;
            public AssetsController(IMyAppRepository repo, IMapper mapper)
            {
                _mapper = mapper;
                _repo = repo;
            }

            [HttpGet]
            public async Task<IActionResult> GetAssets(int clientId)
            {   var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var Assets = await _repo.GetAssets(clientId,currentUser);
                 var AssetsToReturn= _mapper.Map<IEnumerable<AssetForListDto>>(Assets);
                 return Ok(AssetsToReturn);
               
            }
            [HttpGet("{id}", Name="GetAsset")]
            public async Task<IActionResult> GetAsset(int id)
            {
                var Asset = await _repo.GetAsset(id, int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
                var AssetToReturn= _mapper.Map<AssetForDetailedDto>(Asset);
                return Ok(AssetToReturn);
              
            }
    }
}