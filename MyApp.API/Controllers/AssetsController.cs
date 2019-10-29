using System;
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
            public async Task <ActionResult<IEnumerable<AssetForListDto>>> GetAssets(int clientId)
            {  
                var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var Assets = await _repo.GetAssets(clientId, currentUserId);
                if (Assets == null)
                    return NotFound();
                 var AssetsToReturn=  _mapper.Map<IEnumerable<AssetForListDto>>(Assets);
                 return new List<AssetForListDto> (AssetsToReturn);
               
            }
            [HttpGet("{id}", Name="GetAsset")]
            
            public async Task<ActionResult<AssetForDetailedDto>> GetAsset(int id, int clientId)
            {   
                var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var AssetFromRepo = await _repo.GetAsset(id, clientId, currentUserId);
                if(AssetFromRepo==null)
                return NotFound();
                var AssetToReturn= _mapper.Map<AssetForDetailedDto>(AssetFromRepo);
                return AssetToReturn;
              
            }
            
             [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsset(int id,int clientId,AssetForUpdateDto assetForUpdateDto)
        {      
            if(id != assetForUpdateDto.Id)
                return Unauthorized();
            
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var AssetFromRepo = await _repo.GetAsset(id, clientId, currentUserId);
            if(AssetFromRepo==null)
             return NotFound();

            _mapper.Map(assetForUpdateDto, AssetFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Asset {id} failed on save");
        }
         [HttpDelete("{id}")]
        public async Task<ActionResult<Asset>> DeleteAsset(int id, int clientId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var AssetFromRepo = await _repo.GetAsset(id, clientId, currentUserId);
            if(AssetFromRepo==null)
                return NotFound();
             _repo.Delete(AssetFromRepo);
  
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception("Error deleting the Asset");
        }

    }
}