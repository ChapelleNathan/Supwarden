using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.GroupRepository;

public class GroupRepository(DataContext context) : IGroupRepository
{
    public void Save()
    {
        context.SaveChanges();
    }

    public async Task<Group> CreateGroup(Group group)
    {
        var newGroup = await context.Groups.AddAsync(group);
        return newGroup.Entity;
    }

    public async Task<Group?> GetGroupById(string id)
    {
        return await context.Groups.FirstOrDefaultAsync(group => group.Id.ToString() == id);
    }

    public Group UpdateGroup(Group group)
    {
        var updatedGroup = context.Groups.Update(group);
        context.SaveChanges();
        return updatedGroup.Entity;
    }
}