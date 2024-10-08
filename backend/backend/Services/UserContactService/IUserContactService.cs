using backend.DTO;

namespace backend.Services.UserContactService;

public interface IUserContactService
{
    public Task<UserContactDto> AddContact(string contactId);

    public Task<List<UserContactDto>> GetUserContacts();

    public Task<List<UserContactDto>> GetPendingRequest();

    public Task<UserContactDto> UpdateFriendRequest(int userContactId, bool isAccepted);

    public Task<List<UserDto>> GetContacts();
}