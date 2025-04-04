using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Entitities;
using Backend.Interfaces;
using Backend.Specifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]

public class ProductsController : BaseApiController
{
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IGenericRepository<ProductType> _productTypeRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
    {
        _productRepo = productRepo;
        _productBrandRepo = productBrandRepo;
        _productTypeRepo = productTypeRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductReturnDto>>> GetProducts()
    {
        var spec = new ProductWithSpecification();
        var products = await _productRepo.ListAsync(spec);
        return Ok(
            _mapper.Map<IReadOnlyList<Product>, 
            IReadOnlyList<ProductReturnDto>>(products));
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductReturnDto>> GetProduct(int id)
    {
        var spec = new ProductWithSpecification(id);
        
       //var product = await _productRepo.GetByIdAsync(id);
        var product = await _productRepo.GetEntityWithSpec(spec);
        /*return new ProductReturnDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            PictureUrl = product.PictureUrl,
            Price = product.Price,
            ProductBrand = product.ProductBrand.Name,
            ProductType = product.ProductType.Name

        };*/
        return _mapper.Map<Product, ProductReturnDto>(product);
    }
    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
        var productBrands = await _productBrandRepo.ListAllAsync();
        return Ok(productBrands);
    }
    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
        var productTypes = await _productTypeRepo.ListAllAsync();
        return Ok(productTypes);
    }
}
