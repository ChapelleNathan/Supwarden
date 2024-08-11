using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTO;
using backend.Helper;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.AuthService;

public interface IAuthService
{

    public Task<UserDto> Signin(CreateUserDto userDto);
    public Task<ConnectedUserDto> Login(AuthUserDto authUserDto);
}