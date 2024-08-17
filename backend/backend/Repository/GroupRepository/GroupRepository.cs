using backend.Context;

namespace backend.Repository.GroupRepository;

public class GroupRepository(DataContext context) : IGroupRepository
{
    public void Save()
    {
        context.SaveChanges();
    }
}