using backend.Context;
using backend.DTO;
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
            .Include(userGroup => userGroup.Group)
            .Include(userGroup => userGroup.User)
            .FirstOrDefaultAsync();
    }

    public async Task<List<UserGroup>> GetAllUsersFromGroup(string groupId)
    {
        var users = await context.UserGroups
            .Where(userGroup => userGroup.Group.Id.ToString() == groupId)
            .Include(userGroup => userGroup.User)
            .Include(userGroup => userGroup.Group)
            .ToListAsync();
        return users!;
    }

    public UserGroup ChangeEditPerm(UserGroup updatedUserGroup)
    {
         var userGroup = context.UserGroups.Update(updatedUserGroup);
         return userGroup.Entity;
    }

    public UserGroup ChangeCreatorPerm(UserGroup updatedUserGroup)
    {
        var userGroup = context.UserGroups.Update(updatedUserGroup);
        return userGroup.Entity;
    }
}