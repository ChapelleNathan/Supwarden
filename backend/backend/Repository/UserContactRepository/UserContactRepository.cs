using backend.Context;

namespace backend.Repository.UserContact;

public class UserContactRepository(DataContext context) : IUserContactRepository
{
    public void Save()
    {
        context.SaveChanges();
    }
}