﻿using Backend.Data;
using Backend.Entitities;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]

public class ProductsController : ControllerBase
{
    private readonly StoreContext _context;
    private readonly IProductRepository _repo;

    public ProductsController(IProductRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _repo.GetProductsAsync();
        return Ok(products);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _repo.GetProductByIdAsync(id);
        return product;
    }
    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
        var productBrands = await _repo.GetProductBrandsAsync();
        return Ok(productBrands);
    }
    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
        var productTypes = await _repo.GetProductTypesAsync();
        return Ok(productTypes);
    }
}
