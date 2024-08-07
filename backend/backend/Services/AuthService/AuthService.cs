using System.Text.RegularExpressions;
using AutoMapper;
using backend.Context;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.UserRepository;

namespace backend.Services.AuthService;

public class AuthService(IUserRepository userRepository, IMapper mapper, DataContext context) : IAuthService
{

    public async Task<UserDto> Login(AuthUserDto authUserDto)
    {
        var user = await userRepository.FindUserByEmail(authUserDto.Email);
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.ConnectionError400);
            throw new HttpResponseException(404, errorMessage, authUserDto);
        }
        var userDto = mapper.Map<UserDto>(user);
        
        var checkPassword = BCrypt.Net.BCrypt.Verify(authUserDto.Password, user.Password);
        if (!checkPassword)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.ConnectionError400);
            throw new HttpResponseException(400, errorMessage, userDto);
        }

        userDto.Token = IAuthService.GenerateToken(user);
        
        return userDto;
    }

    private void IsUserCorrect(User user)
    {
        if (!Regex.Match(user.Email, "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").Success)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.EmailNotValid400);            
            throw new HttpResponseException(400,errorMessage ,user);
        }
    }
}