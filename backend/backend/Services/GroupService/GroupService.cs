using System.Security.Claims;
using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.GroupRepository;
using backend.Repository.UserGroupRepository;
using backend.Repository.UserRepository;

namespace backend.Services.GroupService;

public class GroupService(
    IGroupRepository groupRepository,
    IHttpContextAccessor httpContext,
    IUserRepository userRepository,
    IUserGroupRepository userGroupRepository,
    IMapper mapper) : IGroupService
{
    public async Task<GroupDto> CreateGroup(string groupName)
    {
        var group = await groupRepository.CreateGroup(new Group() { Name = groupName });
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var userGroup = await userGroupRepository.AddUser(new UserGroup()
            { Group = group, User = connectedUser, CanEdit = true, IsCreator = true });
        if (userGroup is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup500UserGroupCreationError);
            throw new HttpResponseException(500, errorMessage);
        }

        var groupDto = new GroupDto()
        {
            Id = group.Id.ToString(),
            Name = group.Name,
            Users = [mapper.Map<UserGroupDto>(userGroup)]
        };
        userGroupRepository.Save();
        return groupDto;
    }
}