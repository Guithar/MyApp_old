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
                    UserName = "Admin",
                    TenantId=1
                };

                IdentityResult result = userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
                }
            }
        }
        public static void SeedTenants(DataContext context)
         {
            if(!context.Tenants.Any())
            {
                var tenantData = System.IO.File.ReadAllText("Data/SeedDataTenant.json");
                var tenants = JsonConvert.DeserializeObject<List<Tenant>>(tenantData);
                foreach (var tenant in tenants)
                {
                    context.Tenants.Add(tenant);
                };
                context.SaveChanges();
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

        public static void SeedDataCagetoryProductAsset(DataContext context)
         {
            if(!context.ProductCategories.Any())
            {
                var productsData = System.IO.File.ReadAllText("Data/SeedDataCagetoryProductAsset.json");
                var products = JsonConvert.DeserializeObject<List<ProductCategory>>(productsData);
                foreach (var product in products)
                {
                    
                    context.ProductCategories.Add(product);
                };
                context.SaveChanges();
            }
         }
         public static void SeedDataMaint(DataContext context)
         {
            if(!context.MaintSchedules.Any())
            {
                var MaintData = System.IO.File.ReadAllText("Data/SeedDataMaint.json");
                var MaintSchedules = JsonConvert.DeserializeObject<List<MaintSchedule>>(MaintData);
                foreach (var MaintSchedule in MaintSchedules)
                {
                    
                    context.MaintSchedules.Add(MaintSchedule);
                };
                context.SaveChanges();
            }
         }
    }
}