using backend.Models;

namespace backend.Repository.UserGroupRepository;

public interface IUserGroupRepository : IRepository
{
    public Task<UserGroup> AddUser(UserGroup userGroup);
}