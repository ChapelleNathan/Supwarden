using backend.DTO;
using backend.Models;

namespace backend.Repository.UserContactRepository;

public interface IUserContactRepository : IRepository
{
    public Task<UserContact> AddContact(UserContact newContact);

    public bool AreFriend(User connectedUser, User contact);

    public Task<List<UserContact>> GetUserContact(Guid connectedUserId);

    public Task<List<UserContact>> GetFriendRequest(Guid connectedUserId);

    public Task<UserContact?> GetUserContactById(int id);
}