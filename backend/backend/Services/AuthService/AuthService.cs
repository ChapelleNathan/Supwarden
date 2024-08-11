using System.Text.RegularExpressions;
using AutoMapper;
using backend.Context;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.UserRepository;

namespace backend.Services.AuthService;

public class AuthService(IUserRepository userRepository, IMapper mapper, AuthHelper authHelper) : IAuthService
{
    public async Task<UserDto> Signin(CreateUserDto userDto)
    {
        var user = await userRepository.CreateUser(mapper.Map<User>(userDto));
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup500CreationError);
            throw new HttpResponseException(500,errorMessage ,user);
        }
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        IsUserCorrect(user);
        
        userRepository.Save();
        
        return mapper.Map<UserDto>(user);
    }

    public async Task<ConnectedUserDto> Login(AuthUserDto authUserDto)
    {
        var user = await userRepository.FindUserByEmail(authUserDto.Email);
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectionError);
            throw new HttpResponseException(404, errorMessage, authUserDto);
        }
        var userDto = mapper.Map<ConnectedUserDto>(user);
        
        var checkPassword = BCrypt.Net.BCrypt.Verify(authUserDto.Password, user.Password);
        if (!checkPassword)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectionError);
            throw new HttpResponseException(400, errorMessage, userDto);
        }

        userDto.Token = authHelper.GenerateToken(user);
        
        return userDto;
    }

    private void IsUserCorrect(User user)
    {
        if (!Regex.Match(user.Email, "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").Success)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400EmailNotValid);            
            throw new HttpResponseException(400,errorMessage ,user);
        }
    }
}