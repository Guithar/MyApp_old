using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.API.Dtos;
using MyApp.API.Helpers;
using MyApp.API.Models;

namespace MyApp.API.Data
{
    public interface IMyAppRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        Task<IEnumerable<Client>> GetClients(int currentTenantId);
        Task<Client> GetClient(int id, int currentTenantId);
        Task<IEnumerable<Asset>> GetAssets(int clientId, int currentTenantId);
        Task<Asset> GetAsset(int id, int clientId, int currentTenantId);
        Task<IEnumerable<Product>> GetProducts(int currentTenantId, ProductParams productParams);
        Task<Product> GetProduct(int id,int currentTenantId);
        Task<IEnumerable<ProductCategory>> GetCategories(int currentTenantId);
        Task<IEnumerable<MaintSchedule>> GetMaintSchedules(int currentTenantId, 
            MaintScheduleParams productParams);
        Task<MaintSchedule> GetMaintSchedule(int currentTenantId, int id);
        Task<IEnumerable<MaintScheduleAsset>> GetMaintScheduleAssets(int currentTenantId, int assetId);

        Task <MaintScheduleAsset> GetMaintScheduleAsset (int currentTenantId, int assetId,
         int maintScheduleId);
        

    }
}