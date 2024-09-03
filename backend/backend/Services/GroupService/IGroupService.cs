using backend.DTO;

namespace backend.Services.GroupService;

public interface IGroupService
{
    public Task<GroupDto> CreateGroup(string groupName);

    public Task<GroupDto> AddUserToGroup(string groupId, string addedUser);

    public Task<List<LightGroupDto>> GetUserGroups(string userId);

    public Task<GroupDto> GetGroup(string groupId);

    public Task<List<UserGroupDto>> GetUsersFromGroup(string groupId);

    public Task<UserGroupDto> GetUserGroup(string groupId);

    public Task<UserGroupDto> ChangeEditPerm(UserGroupDto userGroupDto);

    public Task<UserGroupDto> ChangeCreatorPerm(UserGroupDto userGroupDto);

    public Task<LightGroupDto> UpdateGroupDto(LightGroupDto groupDto);
}