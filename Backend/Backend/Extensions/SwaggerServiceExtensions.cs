﻿using Microsoft.OpenApi.Models;


namespace Backend.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", 
                    new OpenApiInfo 
                    { 
                        Title = "Shop App API", Version = "v1" 
                    });
            });

            return services;
        }
        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
         
        
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1"); });
            return app;
        }
    }
}
