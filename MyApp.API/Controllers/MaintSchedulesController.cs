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
     [Route("api/[controller]")]
    [ApiController]
    public class MaintSchedulesController: ControllerBase
    {
        
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public MaintSchedulesController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
                
        }
        [HttpGet]
          public async Task <ActionResult<IEnumerable<MaintSchedulesForListDto>>> getMaintSchedules(
              [FromQuery] MaintScheduleParams maintScheduleParams)
        {  
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maintSchedules = await _repo.GetMaintSchedules( currentTenantId, maintScheduleParams);
            if (maintSchedules == null)
                return NotFound();
            var maintSchedulesToReturn= _mapper.Map<IEnumerable<MaintSchedulesForListDto>>(maintSchedules);
            return new List<MaintSchedulesForListDto>(maintSchedulesToReturn);
            
        }
         [HttpGet("{id}")]
          public async Task <ActionResult<MaintSchedulesForListDto>> getMaintSchedule(int id)
        {  
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maintSchedules = await _repo.GetMaintSchedule( currentTenantId, id);
            if (maintSchedules == null)
                return NotFound();
            var maintSchedulesToReturn= _mapper.Map<MaintSchedulesForListDto>(maintSchedules);
            return maintSchedulesToReturn;
            
        }

        [HttpGet("asset/{assetId}")]
         public async Task <ActionResult<IEnumerable<MaintScheduleAssetDto>>> getMaintScheduleAssets(int assetId)
         {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var maintSchedules = await _repo.GetMaintScheduleAssets( currentTenantId, assetId);
            if (maintSchedules == null)
                return NotFound();
            var maintSchedulesToReturn= _mapper.Map<IEnumerable<MaintScheduleAssetDto>>(maintSchedules);
            return new List<MaintScheduleAssetDto>(maintSchedulesToReturn);
         }

         [HttpPut("asset/{assetId}/{maintScheduleId}")]
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
           [HttpDelete("asset/{assetId}/{maintScheduleId}")]
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

    }
}