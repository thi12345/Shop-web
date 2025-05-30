﻿using Backend.Entitities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByUserByClaimsPrincipleWithAddressAsync(
            this UserManager<AppUser> input,
            ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x =>
                    x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.Include(x => x.Address)
                .SingleOrDefaultAsync(x => x.Email == email);
        }
        public static async Task<AppUser> FindByEmailFromClaimsPrinciple(
            this UserManager<AppUser> input,
            ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x =>
                x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.SingleOrDefaultAsync(x =>
            x.Email == email);
        }
    }
}
