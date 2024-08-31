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

internal class GroupService(
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

        userGroupRepository.Save();
        
        return new GroupDto() {
            Id = group.Id.ToString(),
            Name = group.Name,
            Users = [mapper.Map<UserGroupDto>(userGroup)]
        };;
    }

    public async Task<GroupDto> AddUserToGroup(string groupId, string addedUserId)
    {
        var group = await groupRepository.GetGroupById(groupId);
        if (group is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        var addedUser = await userRepository.GetUser(addedUserId);
        if (addedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var userGroups = await userGroupRepository.GetAllUsersFromGroup(groupId);
        var usersInGroup = userGroups.Select(userGroup => userGroup.User).ToList();
        if (!usersInGroup.Contains(connectedUser))
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400NotInGroup);
            throw new HttpResponseException(400, errorMessage);
        }
        if (usersInGroup.Contains(addedUser))
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400AlreadyInGroup);
            throw new HttpResponseException(400, errorMessage);
        }

        var newUserGroup =
            await userGroupRepository.AddUser(new UserGroup() { Group = group, User = addedUser });
        if (newUserGroup is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup500UserGroupCreationError);
            throw new HttpResponseException(500, errorMessage);
        }
        
        groupRepository.Save();
        userGroups.Add(newUserGroup);
        return new GroupDto()
        {
            Id = group.Id.ToString(),
            Name = group.Name,
            Users = userGroups.Select(userGroup => mapper.Map<UserGroupDto>(userGroup)).ToList()
        };
    }

    public async Task<List<LightGroupDto>> GetUserGroups(string userId)
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if(connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.GetUser(userId);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        if (connectedEmail.Value != connectedUser.Email)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400Authorization);
            throw new HttpResponseException(400, errorMessage);
        }

        var userGroups = await userGroupRepository.GetUserGroups(connectedUser.Id.ToString());

        return userGroups.Select(userGroup => mapper.Map<LightGroupDto>(userGroup.Group)).ToList();
    }

    public async Task<GroupDto> GetGroup(string groupId)
    {
        await GetConnectedUser();

        var group = await groupRepository.GetGroupById(groupId);
        if(group is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        return mapper.Map<GroupDto>(group);
    }

    public async Task<List<UserGroupDto>> GetUsersFromGroup(string groupId)
    {
        var userGroups = await userGroupRepository.GetAllUsersFromGroup(groupId);
        
        return userGroups.Select(user => mapper.Map<UserGroupDto>(user)).ToList();
    }

    public async Task<UserGroupDto> GetUserGroup(string groupId)
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var userGroup = await userGroupRepository.GetUserGroup(connectedUser.Id.ToString(), groupId);
        if (userGroup is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotInGroup);
            throw new HttpResponseException(404, errorMessage);
        }

        return mapper.Map<UserGroupDto>(userGroup);
    }

    public async Task<UserGroupDto> ChangeEditPerm(UserGroupDto userGroupDto)
    {
        var connectedUser = await GetConnectedUser();

        var connectedUserGroup = await UserPermVerification(connectedUser, userGroupDto);

        if (connectedUserGroup.User.Id == userGroupDto.User.Id)
        {
            switch (userGroupDto.IsCreator)
            {
                case false:
                    var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ModifPermEditNotCreator);
                    throw new HttpResponseException(400, errorMessage);
                case true:
                    errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ModifPermEditCreator);
                    throw new HttpResponseException(400, errorMessage);
            }
            
        }

        var userGroup = await userGroupRepository.GetUserGroup(userGroupDto.User.Id.ToString(), userGroupDto.Group.Id);
        userGroup!.CanEdit = !userGroup.CanEdit;
        var updatedUserGroup = userGroupRepository.UpdateGroup(userGroup);
        
        userRepository.Save();
        return mapper.Map<UserGroupDto>(updatedUserGroup);
    }

    public async Task<UserGroupDto> ChangeCreatorPerm(UserGroupDto userGroupDto)
    {
        var connectedUser = await GetConnectedUser();
        
        var connectedUserGroup = await UserPermVerification(connectedUser, userGroupDto);

        if (userGroupDto.User.Id == connectedUser.Id && userGroupDto.IsCreator)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ModifPermCreatorIsCreator);
            throw new HttpResponseException(400, errorMessage);
        }

        var userGroup = await userGroupRepository.GetUserGroup(userGroupDto.User.Id.ToString(), userGroupDto.Group.Id);
        userGroup!.IsCreator = true;
        userGroup.CanEdit = true;
        var updatedUserGroup = userGroupRepository.UpdateGroup(userGroup);
        
        
        connectedUserGroup.IsCreator = false;
        connectedUserGroup.CanEdit = false;
        userGroupRepository.UpdateGroup(connectedUserGroup);

        userGroupRepository.Save();
        return mapper.Map<UserGroupDto>(updatedUserGroup);
    }

    public async Task<LightGroupDto> UpdateGroupDto(LightGroupDto groupDto)
    {
        var group = await groupRepository.GetGroupById(groupDto.Id);
        if (group is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
            throw new HttpResponseException(404, errorMessage);
        }
        
        group.Name = groupDto.Name;
        return mapper.Map<LightGroupDto>(groupRepository.UpdateGroup(group));
    }

    private async Task<UserGroup> UserPermVerification(User connectedUser, UserGroupDto userGroupDto)
    {
        var connectedUserGroup = await userGroupRepository.GetUserGroup(connectedUser.Id.ToString(), userGroupDto.Group.Id);
        if (connectedUserGroup is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400NotInGroup);
            throw new HttpResponseException(400, errorMessage);
        }

        if (!connectedUserGroup.IsCreator)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400UserGroupUnauthorized);
            throw new HttpResponseException(400, errorMessage);
        }

        return connectedUserGroup;
    }
    
    private async Task<User> GetConnectedUser()
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        return connectedUser;
    }
    
}