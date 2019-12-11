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
    }
}