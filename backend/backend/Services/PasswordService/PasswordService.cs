using System.Security.Claims;
using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.PasswordRepository;
using backend.Repository.UserRepository;
using Microsoft.AspNetCore.Authentication;

namespace backend.Services.PasswordService;

public class PasswordService(
    IMapper mapper,
    IPasswordRepository passwordRepository,
    IUserRepository userRepository,
    IHttpContextAccessor context) : IPasswordService
{
    public async Task<PasswordDto> CreatePassword(CreatePasswordDto newPassword)
    {
        var userEmail = context.HttpContext?.User.FindFirst(ClaimTypes.Email)!;
        var user = await userRepository.FindUserByEmail(userEmail.Value);
        var password = await passwordRepository.CreatePassword(mapper.Map<Password>(newPassword));
        if (password is null || user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup500PasswordCreation);
            throw new HttpResponseException(500, errorMessage);
        }

        password.SitePassword = PasswordSaveHelper.EncryptPassword(password.SitePassword);
        password.User = user;
        
        passwordRepository.Save();
        return mapper.Map<PasswordDto>(password);
    }
}