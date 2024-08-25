using System.Security.Claims;
using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.UserContactRepository;
using backend.Repository.UserRepository;


namespace backend.Services.UserContactService;

public class UserContactService(
    IUserContactRepository userContactRepository,
    IUserRepository userRepository,
    IHttpContextAccessor httpContext,
    IMapper mapper
) : IUserContactService
{
    public async Task<UserContactDto> AddContact(string contactId)
    {
        var contextEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (contextEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(contextEmail.Value);
        var contact = await userRepository.GetUser(contactId);

        if (contact is null || connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        if (userContactRepository.AreFriend(connectedUser, contact))
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400AlreadyFriend);
            throw new HttpResponseException(400, errorMessage);
        }

        var userContact = await userContactRepository.AddContact(
            new UserContact()
            {
                User1 = connectedUser,
                User2 = contact
            });

        return mapper.Map<UserContactDto>(userContact);
    }

    public async Task<List<UserContactDto>> GetUserContacts()
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400Authorization);
            throw new HttpResponseException(400, errorMessage);
        }
        
        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var contacts = await userContactRepository.GetUserContact(connectedUser.Id);

        return contacts.Select(contact => mapper.Map<UserContactDto>(contact)).ToList();
    }

    public async Task<List<UserContactDto>> GetPendingRequest()
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var pendingList = await userContactRepository.GetFriendRequest(connectedUser.Id);

        return pendingList.Select(userContact => mapper.Map<UserContactDto>(userContact)).ToList();
    }

    public async Task<UserContactDto> UpdateFriendRequest(int userContactId, bool isAccepted)
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }
        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        var userContact = await userContactRepository.GetUserContactById(userContactId);
        if (userContact is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserContactNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        if (userContact.User2 != connectedUser)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400Authorization);
            throw new HttpResponseException(400, errorMessage);
        }

        if (isAccepted)
        {
            userContact.Status = ContactRequestEnum.Accepted;
        }
        else
        {
            userContact.Status = ContactRequestEnum.Refused;
        }
        
        userContactRepository.Save();
        return mapper.Map<UserContactDto>(userContact);
    }

    public async Task<List<UserDto>> GetContacts()
    {
        var connectedEmail = httpContext.HttpContext?.User.FindFirst(ClaimTypes.Email);
        if (connectedEmail is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup400ConnectedUser);
            throw new HttpResponseException(400, errorMessage);
        }

        var connectedUser = await userRepository.FindUserByEmail(connectedEmail.Value);
        if (connectedUser is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var userContacts = await userContactRepository.GetUserContact(connectedUser.Id);

        var contacts = userContacts
            .SelectMany(userContact => new[] { userContact.User1, userContact.User2 })
            .Where(user => user != connectedUser)
            .ToList();
        
        return contacts.Select(contact => mapper.Map<UserDto>(contact)).ToList();
    }
}