using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace backend.Repository.UserGroupRepository;

public class UserGroupRepository(DataContext context) : IUserGroupRepository
{
    public void Save()
    {
        context.SaveChanges();
    }

    public async Task<UserGroup?> AddUser(UserGroup userGroup)
    {
        var newUserGroup = await context.UserGroups.AddAsync(userGroup);
        return newUserGroup.Entity;
    }

    public async Task<List<UserGroup>> GetUserGroups(string userId)
    {
        var userGroupIds = await context.UserGroups
            .Where(userGroup => userGroup.User.Id.ToString() == userId)
            .Include(userGroup => userGroup.Group)
            .ToListAsync();

        return userGroupIds;
    }

    public async Task<UserGroup?> GetUserGroup(string userId, string groupId)
    {
        return await context.UserGroups
            .Where(userGroup => userGroup.User.Id.ToString() == userId &&
                                userGroup.Group.Id.ToString() == groupId)
            .Include(userGroup => userGroup!.Group)
            .FirstOrDefaultAsync();
    }

    public async Task<List<UserGroup>> GetAllUsersFromGroup(string groupId)
    {
        var users = await context.UserGroups
            .Where(userGroup => userGroup.Group.Id.ToString() == groupId)
            .Include(userGroup => userGroup.User)
            .ToListAsync();
        return users!;
    }
}