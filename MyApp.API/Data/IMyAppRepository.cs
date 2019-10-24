using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.API.Helpers;
using MyApp.API.Models;

namespace MyApp.API.Data
{
    public interface IMyAppRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        Task<IEnumerable<Client>> GetClients(int userId);
        Task<Client> GetClient(int id,int userId);
        Task<IEnumerable<Asset>> GetAssets(int clientId, int userId);
        Task<Asset> GetAsset(int id,int userId);
         

         
        
    }
}