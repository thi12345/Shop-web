﻿using AutoMapper;
using Backend.Dtos;
using Backend.Entitities.OrderAggregate;

namespace Backend.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, 
            OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string .IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _config["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }
            return null;
        }
    }
}
