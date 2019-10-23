using MyApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MyApp.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

        public DbSet<Value> Values { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ProductCategory> ProductCategories {get;set;}
        public DbSet<Product> Products { get; set; }
        public DbSet<Asset> Assets { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<Like>()
                .HasKey(k => new {k.LikerId, k.LikeeId});

            builder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(u => u.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(u => u.Liker)
                .WithMany(u => u.Likees)
                .HasForeignKey(u => u.LikerId)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);


            builder.Entity<Client>()
            .Property(c => c.CreatedDate)
            .HasDefaultValueSql("getdate()");
             builder.Entity<Client>()
            .Property(c => c.LastModifiedDate)
            .HasDefaultValueSql("getdate()");
            builder.Entity<Client>()
            .Property(c => c.FullName)
            .HasComputedColumnSql("[LastName] + ', ' + [FirstName]");
            builder.Entity<Client>().HasQueryFilter(c => !c.IsDeleted);

             builder.Entity<Asset>()
            .Property(a => a.CreatedDate)
            .HasDefaultValueSql("getdate()");
            builder.Entity<Asset>()
            .Property(a => a.ManufacturedDate)
            .HasDefaultValueSql("getdate()");
            builder.Entity<Asset>()
            .Property(a => a.Quantity)
            .HasDefaultValue(1);
            builder.Entity<Asset>()
            .Property(a => a.IsActive)
            .HasDefaultValue(true);

        }
    }
}