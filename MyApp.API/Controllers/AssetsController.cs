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
        [Route("api/clients/{clientId}/[controller]")]
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
        {   // -filters:by MaintScheduleId, by ClientId ,by AssetId - orderBy:
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maints = await _repo.GetAssets(clientId, currentTenantId);
            if (maints == null)
                return NotFound();
            var maintsToReturn= _mapper.Map<IEnumerable<AssetForListDto>>(maints);
            return new List<AssetForListDto>(maintsToReturn);
            
        }

            [HttpGet("{id}", Name="GetAsset")]
            
            public async Task<ActionResult<AssetForDetailedDto>> GetAsset(int id, int clientId)
            {   
                var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
                var AssetFromRepo = await _repo.GetAsset(id, clientId, currentTenantId);
                if(AssetFromRepo==null)
                return NotFound();
                var AssetToReturn= _mapper.Map<AssetForDetailedDto>(AssetFromRepo);
                return AssetToReturn;
              
            }
            
             [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsset(int id,int clientId,AssetForUpdateDto assetForUpdateDto)
        {      
            // if(id != assetForUpdateDto.Id)
            //     return Unauthorized();
            
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);

            var AssetFromRepo = await _repo.GetAsset(id, clientId, currentTenantId);
            if(AssetFromRepo==null)
             return NotFound();
                // TODO update only ProductId and not the properties of Product
            _mapper.Map(assetForUpdateDto, AssetFromRepo);
                     // si me traigo el subObjeto product el problema está al mapear,
                    // porque intensa sobreescribir el objeto product y su id           

            if (await _repo.SaveAll())
                return NoContent();
            return BadRequest("No changes were applied");
            //throw new Exception($"Updating Asset {id} failed on save");   
        }

          [HttpPost]
        public async Task<ActionResult<AssetForDetailedDto>> CreateAsset(int clientId, AssetForCreationDto assetForCreationDto)
        {
            var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);             var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var ClientFromRepo = await _repo.GetClient(clientId, currentTenantId);
            if (ClientFromRepo == null)
               return Unauthorized();
               
            assetForCreationDto.TenantId = currentTenantId;
            assetForCreationDto.ClientId = clientId;
            assetForCreationDto.CreatedBy= currentUserId;
            assetForCreationDto.UpdatedBy= currentUserId;

            var asset = _mapper.Map<Asset>(assetForCreationDto);

            _repo.Add(asset);

            if (await _repo.SaveAll())
            {
                var assetToReturn= _mapper.Map<AssetForDetailedDto>(asset);
                return CreatedAtRoute("GetAsset", new {id = asset.Id}, assetToReturn);
            }

            throw new Exception("Creating the asset failed on save");
        }

         [HttpDelete("{id}")]
        public async Task<ActionResult<Asset>> DeleteAsset(int id, int clientId)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);

            var AssetFromRepo = await _repo.GetAsset(id, clientId, currentTenantId);
            if(AssetFromRepo==null)
                return NotFound();
             _repo.Delete(AssetFromRepo);
  
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception("Error deleting the Asset");
        }

    }
}