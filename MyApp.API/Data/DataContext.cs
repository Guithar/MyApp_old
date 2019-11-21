using MyApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace MyApp.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        
        public DataContext( DbContextOptions<DataContext> options) : base(options) 
        {
            
         }

        public DbSet<Value> Values { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Tenant> Tenants { get; set; }

        public DbSet<MaintSchedule> MaintSchedules { get; set; }
        public DbSet<MaintScheduleAsset> MaintSchedulesAssets { get; set; }
        public DbSet<MaintResult> MaintResults { get; set; }
        public DbSet<MaintOperation> MaintOperations { get; set; }
        



        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            { //  If the field "IsDelete" doesn't exist makes a hard delete
                if (entry.Entity.GetType().GetProperty("IsDeleted") != null)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            entry.CurrentValues["IsDeleted"] = false;
                            break;
                        case EntityState.Deleted:
                            entry.State = EntityState.Modified;
                            entry.CurrentValues["IsDeleted"] = true;
                            break;
                    }
                }
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
             builder.Entity<Tenant>(tenant =>
            {
                // audit fields
                tenant.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                tenant.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                tenant.Property(a => a.IsDeleted).HasDefaultValue(false);
                tenant.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });
            
             builder.Entity<User>(user =>
            {
                // audit fields
                user.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                user.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                user.Property(a => a.IsDeleted).HasDefaultValue(false);
                user.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

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
                .HasKey(k => new { k.LikerId, k.LikeeId });

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
 

            builder.Entity<Client>(client =>
            {
                client.Property(c => c.FullName).HasComputedColumnSql("[LastName] + ', ' + [FirstName]");
                // audit fields
                client.Property(a => a.IsActive).HasDefaultValue(true);
                client.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                client.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                client.Property(a => a.IsDeleted).HasDefaultValue(false);
                client.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });

            builder.Entity<Asset>(asset =>
            {
                asset.Property(a => a.ManufacturedDate).HasDefaultValueSql("getdate()");
                asset.Property(a => a.IsActive).HasDefaultValue(true);
                asset.Property(a => a.Quantity).HasDefaultValue(1);
                // audit fields
                asset.Property(a => a.IsActive).HasDefaultValue(true);
                asset.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                asset.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                asset.Property(a => a.IsDeleted).HasDefaultValue(false);
                asset.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });
             builder.Entity<Product>(product =>
            {  
                // audit fields
                product.Property(a => a.IsActive).HasDefaultValue(true);
                product.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                product.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                product.Property(a => a.IsDeleted).HasDefaultValue(false);
                product.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });

            builder.Entity<ProductCategory>(productCategory =>
            {
                // audit fields
                productCategory.Property(a => a.IsActive).HasDefaultValue(true);
                productCategory.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                productCategory.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                productCategory.Property(a => a.IsDeleted).HasDefaultValue(false);
                productCategory.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
            });

            builder.Entity<MaintSchedule>(MaintSchedule =>
            {
            // audit fields
                MaintSchedule.Property(a => a.IsActive).HasDefaultValue(true);
                MaintSchedule.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                MaintSchedule.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                MaintSchedule.Property(a => a.IsDeleted).HasDefaultValue(false);
                MaintSchedule.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
         });

            builder.Entity<MaintSchedule>(MaintOperation =>
            {
            // audit fields
                MaintOperation.Property(a => a.IsActive).HasDefaultValue(true);
                MaintOperation.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                MaintOperation.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                MaintOperation.Property(a => a.IsDeleted).HasDefaultValue(false);
                MaintOperation.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
         });
            builder.Entity<MaintScheduleAsset>(MaintScheduleAsset =>
            {
                MaintScheduleAsset.HasKey(x => new{x.MaintScheduleId, x.AssetId});
                // audit fields
                MaintScheduleAsset.Property(a => a.IsActive).HasDefaultValue(true);
                MaintScheduleAsset.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                MaintScheduleAsset.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                MaintScheduleAsset.Property(a => a.IsDeleted).HasDefaultValue(false);
                MaintScheduleAsset.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
         });

            builder.Entity<MaintResult>(MaintResult =>
            {
                MaintResult.HasOne(mr => mr.MaintScheduleAsset)
                .WithMany(msa => msa.MaintResults)
                .HasForeignKey(mr => new { mr.AssetId, mr.MaintScheduleId });
                // audit fields
                MaintResult.Property(a => a.IsActive).HasDefaultValue(true);
                MaintResult.Property(c => c.CreatedOn).HasDefaultValueSql("getdate()");
                MaintResult.Property(c => c.UpdatedOn).HasDefaultValueSql("getdate()");
                MaintResult.Property(a => a.IsDeleted).HasDefaultValue(false);
                MaintResult.HasQueryFilter(c => EF.Property<bool>(c, "IsDeleted") == false);
        
            });

            
        }

    }
}