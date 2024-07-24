using backend.DTO;

namespace backend.Services.UserServices;

public interface IUserServices
{
    public Task<PublicUserDto> CreateUser(CreateUserDto userDto);
    public Task<PublicUserDto> GetUser(string id);

    public Task<PublicUserDto> AuthUser(AuthUser authUser);
}