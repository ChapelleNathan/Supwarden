using backend.Models;

namespace backend.Repository.UserContactRepository;

public interface IUserContactRepository : IRepository
{
    public Task<UserContact> AddContact(UserContact newContact);

    public bool AreFriend(User connectedUser, User contact);
}