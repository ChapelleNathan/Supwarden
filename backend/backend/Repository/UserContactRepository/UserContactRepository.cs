using backend.Context;

namespace backend.Repository.UserContactRepository;

public class UserContactRepository(DataContext context) : IUserContactRepository
{
    public void Save()
    {
        context.SaveChanges();
    }
}