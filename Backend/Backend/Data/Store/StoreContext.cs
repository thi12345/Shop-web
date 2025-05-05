using Backend.Entitities;
using Backend.Entitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Backend.Data.Store
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }
        #region DbSet
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> Items { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //if (Database.ProviderName == "Microsoft.EntityFramework.SqlServer")

        }
        #endregion DbSet
    }
}
