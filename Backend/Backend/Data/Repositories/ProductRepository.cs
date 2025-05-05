using Backend.Data.Store;
using Backend.Entitities;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly StoreContext _context;

    public  ProductRepository(StoreContext context)
    {
        _context = context;
    }


    public async Task<Product> GetProductByIdAsync(int id)
    {
        var product = await _context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .FirstOrDefaultAsync(p => p.Id == id);
        return product;

    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        
        return await _context.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .ToListAsync();
    }
    public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
    {
        return await _context.ProductBrands.ToListAsync();  
    }

    public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
    {
         return await _context.ProductTypes.ToListAsync();
    }
}
