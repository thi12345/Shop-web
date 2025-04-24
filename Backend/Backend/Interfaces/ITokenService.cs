using Backend.Entitities.Identity;

namespace Backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
