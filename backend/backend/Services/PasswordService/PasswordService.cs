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

    public async Task<List<PasswordDto>> GetAllPassword()
    {
        var userEmail = context.HttpContext?.User.FindFirst(ClaimTypes.Email)!;
        var user = await userRepository.FindUserByEmail(userEmail.Value);
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404PasswordUserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var passwords = await passwordRepository.GetAllPasswordFromUser(user.Id);
        passwords.ForEach(password =>
        {
            password.SitePassword = PasswordSaveHelper.DecryptPassword(password.SitePassword);
        });
        return passwords.Select(password => mapper.Map<PasswordDto>(password)).ToList();;
    }

    public async Task<PasswordDto> GetPassword(String passwordId)
    {
        var password = await passwordRepository.GetOnePasswordById(passwordId);
        if (password is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404PasswordNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        password.SitePassword = PasswordSaveHelper.DecryptPassword(password.SitePassword);
        return mapper.Map<PasswordDto>(password);
    }

    public async Task<PasswordDto> UpdatePassword(PasswordDto updatedPassword)
    {
        var password = await passwordRepository.GetOnePasswordById(updatedPassword.Id);
        if (password is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404PasswordNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        password.SitePassword = PasswordSaveHelper.DecryptPassword(password.SitePassword);

        password.Identifier = updatedPassword.Identifier;
        password.Name = updatedPassword.Name;
        password.Uri = updatedPassword.Uri;
        password.Note = updatedPassword.Note;
        password.SitePassword = updatedPassword.SitePassword;

        password.SitePassword = PasswordSaveHelper.EncryptPassword(password.SitePassword);
        
        passwordRepository.UpdatePassword(password);
        passwordRepository.Save();
        return mapper.Map<PasswordDto>(password);
    }
}