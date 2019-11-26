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
    public class ProductsController : ControllerBase
    {
        private readonly IMyAppRepository _repo;
        private readonly IMapper _mapper;
        
        public ProductsController(IMyAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
                
        }
        [HttpGet]
        public async Task <ActionResult<IEnumerable<ProductForListDto>>> getProducts([FromQuery] ProductParams productParams)
        {  
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var products = await _repo.GetProducts( currentTenantId, productParams);
            if (products == null)
                return NotFound();
            var ProductsToReturn= _mapper.Map<IEnumerable<ProductForListDto>>(products);
            return new List<ProductForListDto>(ProductsToReturn);
            
        }

        [HttpGet("{id}", Name="GetProduct")]
        
        public async Task<ActionResult<ProductForListDto>> GetProduct(int id)
        {   
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var productFromRepo = await _repo.GetProduct(id,currentTenantId);
            if(productFromRepo==null)
            return NotFound();
            var productToReturn= _mapper.Map<ProductForListDto>(productFromRepo);
            return productToReturn;
            
        }
          [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id,ProductForUpdateDto productForUpdateDto)
        {   
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var currentUserId=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
           if(id != productForUpdateDto.Id)
                return Unauthorized(); 
            var productFromRepo = await _repo.GetProduct(id, currentTenantId);
            if(productFromRepo==null)
             return NotFound();
            _mapper.Map(productForUpdateDto, productFromRepo);
             productFromRepo.TenantId=currentTenantId;
             productFromRepo.UpdatedBy=currentUserId;
             productFromRepo.UpdatedOn=DateTime.Now;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating product {id} failed on save");
        }
        
    [HttpPost]     
        public async Task<ActionResult<ClientForDetailedDto>> CreateProduct(ProductForCreationDto productForCreationDto)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
             var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            productForCreationDto.TenantId = currentTenantId;
            var product = _mapper.Map<Product>(productForCreationDto);
            product.TenantId=currentTenantId;
            product.CreatedBy=currentUserId;
            product.UpdatedBy=currentUserId;
            product.CreatedOn=DateTime.Now;
            product.UpdatedOn=DateTime.Now;
            _repo.Add(product);

            if (await _repo.SaveAll())
            {
                var productToReturn= _mapper.Map<ProductForListDto>(product);
                return CreatedAtRoute("GetClient", new {id = product.Id}, productToReturn);
            }

            throw new Exception("Creating the product failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var currentTenantId= int.Parse(User.FindFirst("TenantId").Value);
            var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            var productFromRepo = await _repo.GetProduct(id, currentTenantId);
            if(productFromRepo==null)
              return NotFound();
              productFromRepo.DeletedBy=currentUserId;
                 _repo.Delete(productFromRepo);
                
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting the product");
        }

    }
}