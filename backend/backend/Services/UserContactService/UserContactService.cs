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
}