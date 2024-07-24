using System.Security.Cryptography;
using AutoMapper;
using backend.DTO;
using backend.Models;
using backend.Repository.UserRepository;

namespace backend.Services.UserServices;

public class UserServices(IUserRepository userRepository, IMapper mapper) : IUserServices
{
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