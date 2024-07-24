using backend.DTO;

namespace backend.Services.UserServices;

public interface IUserServices
{
    public Task<PublicUserDto> GetUser(string id);
}