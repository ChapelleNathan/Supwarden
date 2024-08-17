using backend.Models;

namespace backend.Repository.GroupRepository;

public interface IGroupRepository : IRepository
{
    public Task<Group> CreateGroup(Group group);
}