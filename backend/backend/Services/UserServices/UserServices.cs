using System.Security.Claims;
using System.Security.Cryptography;
using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.UserRepository;


namespace backend.Services.UserServices;

public class UserServices(IUserRepository userRepository, IMapper mapper, IHttpContextAccessor httpContext) : IUserServices
{
    public async Task<UserDto> GetUser(string id)
    {
        var user = await userRepository.GetUser(id);
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        return mapper.Map<UserDto>(user);
    }

    public async Task<List<UserDto>> SearchUserByEmail(string email)
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400Authorization);
            throw new HttpResponseException(400, errorMessage);
        }
        
        var users = await userRepository.SearchUserByEmail(email);
        
        users = users.Where(user => user.Email != connectedEmail.Value).ToList();

        return users.Select(user => mapper.Map<UserDto>(user)).ToList();
    }
}