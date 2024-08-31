using backend.Models;

namespace backend.Repository.GroupRepository;

public interface IGroupRepository : IRepository
{
    public Task<Group> CreateGroup(Group group);
    public Task<Group?> GetGroupById(string id);

    public Group UpdateGroup(Group group);
}