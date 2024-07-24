using System.Text.RegularExpressions;
using AutoMapper;
using backend.Context;
using backend.DTO;
using backend.Models;
using backend.Repository.UserRepository;

namespace backend.Services.AuthService;

public class AuthService(IUserRepository userRepository, IMapper mapper, DataContext context) : IAuthService
{
    public async Task<PublicUserDto> Signin(CreateUserDto userDto)
    {
        var user = mapper.Map<User>(userDto);
        var test = await userRepository.CreateUser(user);
        
        if(test is null)
            throw new HttpResponseException(500,"impossible de créer un user" ,user);
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        IsUserCorrect(user);
        
        await context.SaveChangesAsync();
        
        return mapper.Map<PublicUserDto>(user);
    }

    public Task<ServiceResponse<PublicUserDto>> Login(AuthUserDto authUserDto)
    {
        throw new NotImplementedException();
    }

    private void IsUserCorrect(User user)
    {
        if (!Regex.Match(user.Email, "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").Success)
            throw new HttpResponseException(400,"Erreur email" ,user);
    }
}