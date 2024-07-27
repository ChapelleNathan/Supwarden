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
    public async Task<PublicUserDto> Signin(CreateUserDto userDto)
    {
        var user = await userRepository.CreateUser(mapper.Map<User>(userDto));

        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.CreationError500);
            throw new HttpResponseException(500,errorMessage ,user);
        }
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        IsUserCorrect(user);
        
        await context.SaveChangesAsync();
        
        return mapper.Map<PublicUserDto>(user);
    }

    public async Task<PublicUserDto> Login(AuthUserDto authUserDto)
    {
        var user = await userRepository.FindUserByEmail(authUserDto.Email);
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.ConnectionError400);
            throw new HttpResponseException(404, errorMessage, authUserDto);
        }
        var userDto = mapper.Map<PublicUserDto>(user);
        
        var checkPassword = BCrypt.Net.BCrypt.Verify(authUserDto.Password, user.Password);
        if (!checkPassword)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.ConnectionError400);
            throw new HttpResponseException(400, errorMessage, userDto);
        }

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