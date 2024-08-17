using backend.DTO;
using backend.Services;
using backend.Services.UserContactService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("user-contact")]
[Authorize]
public class UserContactController (IUserContactService userContactService)
{
    [HttpPost("{contactId}")]
    public async Task<ActionResult<ServiceResponse<UserContactDto>>> AddContact(string contactId)
    {
        var serviceResponse = new ServiceResponse<UserContactDto>();

        try
        {
            serviceResponse.Data = await userContactService.AddContact(contactId);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }
}