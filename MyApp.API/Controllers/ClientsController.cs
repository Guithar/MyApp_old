using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MyApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.API.Dtos;
using System;
using MyApp.API.Models;

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
        public async Task<ActionResult<IEnumerable<ClientForListDto>>> GetClients()
        {   
             var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            // var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            var clients = await _repo.GetClients(currentTenantId);
            var clientsToReturn= _mapper.Map<IEnumerable<ClientForListDto>>(clients);
            return new List<ClientForListDto>(clientsToReturn);
        }
        [HttpGet("{id}", Name="GetClient")]
        public async Task<ActionResult<ClientForDetailedDto>> GetClient(int id)
        {
             var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            // var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            var client = await _repo.GetClient(id, currentTenantId);
            if (client == null)
                return NotFound();
                
            var clientToReturn= _mapper.Map<ClientForDetailedDto>(client);
            return clientToReturn;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClient(int id,ClientForUpdateDto clientForUpdateDto)
        {   
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            // var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            if(id != clientForUpdateDto.Id)
                return Unauthorized(); 
            var clientFromRepo = await _repo.GetClient(id, currentTenantId);
            if(clientFromRepo==null)
             return NotFound();

            _mapper.Map(clientForUpdateDto, clientFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating client {id} failed on save");
        }

    [HttpPost]     
        public async Task<ActionResult<ClientForDetailedDto>> CreateClient(ClientForCreationDto clientForCreationDto)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            // var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            clientForCreationDto.TenantId = currentTenantId;
            var client = _mapper.Map<Client>(clientForCreationDto);

            _repo.Add(client);

            if (await _repo.SaveAll())
            {
                var clientToReturn= _mapper.Map<ClientForDetailedDto>(client);
                return CreatedAtRoute("GetClient", new {id = client.Id}, clientToReturn);
            }

            throw new Exception("Creating the client failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            // var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            var clientFromRepo = await _repo.GetClient(id, currentTenantId);
            if(clientFromRepo==null)
             return Unauthorized();
                 _repo.Delete(clientFromRepo);
                
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting the client");
        }

    }
}