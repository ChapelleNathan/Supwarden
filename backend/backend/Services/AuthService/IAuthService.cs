using backend.DTO;

namespace backend.Services.AuthService;

public interface IAuthService
{
    public Task<PublicUserDto> Signin(CreateUserDto userDto);

    public Task<PublicUserDto> Login(AuthUserDto authUserDto);
}