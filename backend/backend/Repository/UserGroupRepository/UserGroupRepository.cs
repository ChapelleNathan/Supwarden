using backend.Context;
using backend.Models;

namespace backend.Repository.UserGroupRepository;

public class UserGroupRepository(DataContext context) : IUserGroupRepository
{
    public void Save()
    {
        context.SaveChanges();
    }

    public async Task<UserGroup> AddUser(UserGroup userGroup)
    {
        var newUserGroup = await context.UserGroups.AddAsync(userGroup);
        return newUserGroup.Entity;
    }
}