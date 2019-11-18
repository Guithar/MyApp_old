using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyApp.API.Helpers;
using MyApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MyApp.API.Dtos;

namespace MyApp.API.Data
{
    public class MyAppRepository : IMyAppRepository
    {
        private readonly DataContext _context;
        public MyAppRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        
        public void Update<T>(T entity) where T : class
        {
            _context.Entry(entity).State=EntityState.Modified;
        }
    
        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u =>
                u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query = _context.Users.AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0 ;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId 
                        && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId 
                        && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId 
                        && u.RecipientDeleted == false && u.IsRead == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);

            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false 
                    && m.SenderId == recipientId 
                    || m.RecipientId == recipientId && m.SenderId == userId 
                    && m.SenderDeleted == false)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<Client>> GetClients(int currentTenantId)
        {
           var clients= await _context.Clients
           .Where(c => c.TenantId==currentTenantId)
           .ToListAsync();
            return clients;
        }
 
        public async Task<Client> GetClient(int id, int currentTenantId)
        {    
            var query = _context.Clients.AsQueryable();
            var client = await query.FirstOrDefaultAsync(c => c.Id==id && c.TenantId==currentTenantId);
            return client;   
        }
        public async Task<IEnumerable<Asset>> GetAssets(int clientId, int currentTenantId)
        {     
             var assets= await _context.Assets
             .Include(p => p.Product)
             .Where(a=> a.ClientId==clientId && a.TenantId==currentTenantId)
             .ToListAsync(); 
            return assets;
        }
        public async Task<Asset> GetAsset(int id, int clientId, int currentTenantId)
        {           
            var asset= await _context.Assets
             .Include(p => p.Product)
             .Where(a=> a.Id==id && a.ClientId==clientId && a.TenantId==currentTenantId)
             .FirstOrDefaultAsync(); 
            return asset;
        }
       public async Task<IEnumerable<Product>> GetProducts(int currentTenantId, 
        ProductParams productParams)
        { 
            var products=  _context.Products.AsQueryable();

            products= products.Where(p=> p.TenantId==currentTenantId);
             
            System.Console.WriteLine( productParams.categoryId);
            if (productParams.categoryId != 0)
            {
             products= products.Where(p=> p.ProductCategoryId==productParams.categoryId);
            }
            return await products.ToListAsync();
        }

        public async Task<Product> GetProduct(int id, int currentTenantId)
        {
            var product= await _context.Products
             .Where(p=> p.Id == id && p.TenantId==currentTenantId )
             .FirstOrDefaultAsync(); 
            return product;
        }
         public async Task<IEnumerable<ProductCategory>> GetCategories(int currentTenantId)
        {
             var Categories= await _context.ProductCategories
             .Where(c=> c.TenantId==currentTenantId)
             .ToListAsync(); 
            return Categories;
        
        }

       
    }
}