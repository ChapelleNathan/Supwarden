using backend.DTO;

namespace backend.Services.UserServices;

public interface IUserServices
{
    public Task<UserDto> GetUser(string id);

    public Task<List<UserDto>> SearchUserByEmail(string email);
}