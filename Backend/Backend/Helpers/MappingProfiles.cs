using AutoMapper;
using Backend.Dtos;
using Backend.Entitities;

namespace Backend.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductReturnDto>()
                .ForMember(d => d.ProductBrand, 
                o => o.MapFrom( s=> s.ProductBrand.Name))
                .ForMember(d => d.ProductType,
                o => o.MapFrom( s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl,
                o => o.MapFrom<ProductUrlResolver>());
        }
    }
}
