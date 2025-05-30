﻿using AutoMapper;
using Backend.Dtos;
using Backend.Entitities;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository,
            IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            
            return Ok(basket ?? new CustomerBasket(id));
        }
        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

            var updateBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updateBasket);    
        }
        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }

    }
}
