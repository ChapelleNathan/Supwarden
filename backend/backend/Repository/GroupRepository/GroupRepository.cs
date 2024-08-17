using backend.Context;
using backend.Models;

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
}