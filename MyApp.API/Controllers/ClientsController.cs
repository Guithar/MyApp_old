using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MyApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Dtos;

namespace MyApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        public ClientsController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _repo.GetClients(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            var clientsToReturn= _mapper.Map<IEnumerable<ClientForListDto>>(clients);
            return Ok(clientsToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _repo.GetClient(id, int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
            var clientToReturn= _mapper.Map<ClientForDetailedDto>(client);
            return Ok(clientToReturn);
        }
    }
}