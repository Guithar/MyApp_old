using System;
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
     [Route("api/clients/{clientId}/[controller]/{assetId}")]
    [ApiController]
    public class MaintScheduleAssetsController: ControllerBase
    {
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public MaintScheduleAssetsController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet(Name="GetMaintScheduleAssets")]
         public async Task <ActionResult<IEnumerable<MaintScheduleAssetDto>>> getMaintScheduleAssets(int assetId)
         {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maintSchedules = await _repo.GetMaintScheduleAssets( currentTenantId, assetId);
            if (maintSchedules == null)
                return NotFound();
            var maintSchedulesToReturn= _mapper.Map<IEnumerable<MaintScheduleAssetDto>>(maintSchedules);
            return new List<MaintScheduleAssetDto>(maintSchedulesToReturn);
         }
          [HttpGet("{maintScheduleId}", Name="GetMaintScheduleAsset")]
         public async Task <ActionResult<MaintScheduleAssetDto>> getMaintScheduleAsset(int assetId, 
            int maintScheduleId)
         {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maintSchedules = await _repo.GetMaintScheduleAsset( currentTenantId, assetId, maintScheduleId);
            if (maintSchedules == null)
                return NotFound();
            var maintSchedulesToReturn= _mapper.Map<MaintScheduleAssetDto>(maintSchedules);
            return maintSchedulesToReturn;
         }

         [HttpPut("{maintScheduleId}")]
          public async Task<ActionResult> UpdateMaintScheduleAsset(int assetId, int maintScheduleId, 
            MaintScheduleAssetForUpdateDto maintScheduleAssetForUpdateDto)
        {   
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var currentUserId=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

           if(assetId != maintScheduleAssetForUpdateDto.AssetId ||
           maintScheduleId!= maintScheduleAssetForUpdateDto.MaintScheduleId)
                return Unauthorized();             

            var maintScheduleAssetFromRepo = await _repo.GetMaintScheduleAsset(currentTenantId, 
                assetId, maintScheduleId);
            if(maintScheduleAssetFromRepo==null)
             return NotFound();
             
            _mapper.Map(maintScheduleAssetForUpdateDto, maintScheduleAssetFromRepo);
             maintScheduleAssetFromRepo.TenantId=currentTenantId;
             maintScheduleAssetFromRepo.UpdatedBy=currentUserId;
             maintScheduleAssetFromRepo.UpdatedOn=DateTime.Now;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating MaintScheduleAsset " + 
                    $"MaintScheduleId: {maintScheduleId}; AssetId: {assetId}. Failed on save");
        }
           [HttpDelete("{maintScheduleId}")]
        public async Task<ActionResult> DeleteMaintSchedleAsset(int assetId, int maintScheduleId)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            var maintScheduleAssetFromRepo = await _repo.GetMaintScheduleAsset(currentTenantId, 
                assetId, maintScheduleId);
            if(maintScheduleAssetFromRepo==null)
             return NotFound();
              
                 _repo.Delete(maintScheduleAssetFromRepo);
                
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting the MaintenanceScheduleAsset");
        }
        
        [HttpPost()]
        public async Task<ActionResult<MaintScheduleAssetDto>> CreateMaintScheduleAsset(MaintScheduleAssetForCreationDto maintScheduleAssetForCreationDto,
        int clientId)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
             var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

              var assetFromRepo =  await _repo.GetAsset(maintScheduleAssetForCreationDto.AssetId, 
                clientId, currentTenantId );
            if(assetFromRepo==null)
             return NotFound();
           
            var maintScheduleAsset = _mapper.Map<MaintScheduleAsset>(maintScheduleAssetForCreationDto);
            maintScheduleAsset.TenantId=currentTenantId;
            maintScheduleAsset.CreatedBy=currentUserId;
            maintScheduleAsset.UpdatedBy=currentUserId;
            maintScheduleAsset.CreatedOn=DateTime.Now;
            maintScheduleAsset.UpdatedOn=DateTime.Now;
            _repo.Add(maintScheduleAsset);

            if (await _repo.SaveAll())
            {
                var maintScheduleAssetToReturn= _mapper.Map<MaintScheduleAssetDto>(maintScheduleAsset);
                return CreatedAtRoute("GetMaintScheduleAssets", new {id = maintScheduleAsset.AssetId}, maintScheduleAssetToReturn);
            }

            throw new Exception("Creating MaintScheduleAsset failed on save");
        }

    }
}