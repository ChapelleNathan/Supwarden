using backend.Models;

namespace backend.Repository.UserGroupRepository;

public interface IUserGroupRepository : IRepository
{
    public Task<UserGroup?> AddUser(UserGroup userGroup);

    public Task<List<UserGroup>> GetUserGroups(string userId);

    public Task<UserGroup?> GetUserGroup(string userId, string groupId);

    public Task<List<UserGroup>> GetAllUsersFromGroup(string groupId);
}