using System.Collections.Generic;
using System.Linq;
using MyApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace MyApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/SeedDataUser.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"},
                    new Role{Name = "Moderator"},
                    new Role{Name = "VIP"},
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    user.Photos.SingleOrDefault().IsApproved = true;
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult result = userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
                }
            }
        }
         public static void SeedClients(DataContext context)
         {
            if(!context.Clients.Any())
            {
                var clientData = System.IO.File.ReadAllText("Data/SeedDataClient.json");
                var clients = JsonConvert.DeserializeObject<List<Client>>(clientData);
                foreach (var client in clients)
                {
                    context.Clients.Add(client);
                };
                context.SaveChanges();
            }
         }
    }
}