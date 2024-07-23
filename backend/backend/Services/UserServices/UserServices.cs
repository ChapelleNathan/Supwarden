using AutoMapper;
using backend.DTO;
using backend.Models;
using backend.Repository.UserRepository;

namespace backend.Services.UserServices;

public class UserServices(IUserRepository userRepository, IMapper mapper) : IUserServices
{
    public async Task<PublicUserDto> CreateUser(CreateUserDto userDto)
    {
        var newUser = mapper.Map<User>(userDto);
        newUser.Password = PasswordHashService.HashPassword(userDto.Password);
        try
        {
            newUser = await userRepository.CreateUser(newUser);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        
        return mapper.Map<PublicUserDto>(newUser);
    }

    public async Task<PublicUserDto> GetUser(string id)
    {
        User? user;
        try
        {
            user = await userRepository.GetUser(id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return mapper.Map<PublicUserDto>(user);
    }
}