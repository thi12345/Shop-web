﻿using AutoMapper;
using Backend.Dtos;
using Backend.Entitities;
using Backend.Entitities.Identity;
using Backend.Entitities.OrderAggregate;

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
            CreateMap<Backend.Entitities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Backend.Entitities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o=> o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}
