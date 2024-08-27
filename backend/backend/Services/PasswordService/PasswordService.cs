using System.Security.Claims;
using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.GroupRepository;
using backend.Repository.PasswordRepository;
using backend.Repository.UserGroupRepository;
using backend.Repository.UserRepository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.PasswordService;

public class PasswordService(
    IMapper mapper,
    IPasswordRepository passwordRepository,
    IUserRepository userRepository,
    IHttpContextAccessor context,
    IGroupRepository groupRepository,
    IUserGroupRepository userGroupRepository
    ) : IPasswordService
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
        
        if (newPassword.GroupId is not null)
        {
            var group = await groupRepository.GetGroupById(newPassword.GroupId);
            if (group is null)
            {
                var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
                throw new HttpResponseException(404, errorMessage);
            }

            password.Group = group;
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

        var userGroups = await userGroupRepository.GetUserGroups(user.Id.ToString());

        var passwords = await passwordRepository
            .GetAllPasswordFromUser(user.Id, userGroups.IsNullOrEmpty() 
                ? null : userGroups.Select(userGroup => userGroup.Group.Id).ToList());
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

    public async Task<List<PasswordDto>> GetPasswordsFromGroup(string groupId)
    {
        var group = await groupRepository.GetGroupById(groupId);
        if (group is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        var passwords = await passwordRepository.GetPasswordsFromGroup(groupId);
        
        return passwords.Select(password => mapper.Map<PasswordDto>(password)).ToList();
    }

    public async Task<PasswordDto> DeletePassword(string passwordId)
    {
        var password = await passwordRepository.GetOnePasswordById(passwordId);
        if (password is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404PasswordNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        passwordRepository.DeletePassword(password);
        
        return mapper.Map<PasswordDto>(password);
    }
}