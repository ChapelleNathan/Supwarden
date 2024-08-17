using backend.DTO;

namespace backend.Services.UserContactService;

public interface IUserContactService
{
    public Task<UserContactDto> AddContact(string contactId);
}