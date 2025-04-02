using Backend.Entitities;
using System.Text.Json;

namespace Backend.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
        try
        {
            Console.WriteLine("Seeding data... ok");

            if (!context.ProductBrands.Any())
            {
                Console.WriteLine("Add Brands");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                    "Data" ,"SeedData", "brands.json");
                var brandsData = File.ReadAllText(filePath);
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                foreach (var item in brands)
                {
                    item.Id = 0;
                    context.ProductBrands.Add(item);
                }
                await context.SaveChangesAsync();
            }
            if (!context.ProductTypes.Any())
            {
                Console.WriteLine("Add Types");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data" ,
                    "SeedData", "types.json");
                var typesData = File.ReadAllText(filePath);
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                foreach (var item in types)
                {
                    item.Id = 0;
                    context.ProductTypes.Add(item);
                }
                await context.SaveChangesAsync();
            }
            if (!context.Products.Any())
            {
                Console.WriteLine("Add Products");
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data",
                    "SeedData", "products.json");

                var productsData = File.ReadAllText(filePath);
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                foreach (var item in products)
                {
                    item.Id = 0;
                    context.Products.Add(item);
                }
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Skip Database");
            var logger = loggerFactory.CreateLogger<StoreContextSeed>();
            logger.LogError(ex.Message);    
        }
    }
    
}
