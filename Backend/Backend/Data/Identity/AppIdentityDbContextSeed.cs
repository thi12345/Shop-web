using Backend.Entitities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            Console.WriteLine("Seeding user data... ok");

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@example.com",
                    UserName = "bob123",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Roger",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "123"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
