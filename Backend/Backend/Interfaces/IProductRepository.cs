﻿using Backend.Entitities;

namespace Backend.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task <IReadOnlyList<Product>> GetProductsAsync();
        Task <IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task <IReadOnlyList<ProductType>> GetProductTypesAsync();

    }
}
