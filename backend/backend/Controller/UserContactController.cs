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

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<UserContactDto>>>> GetUserContact()
    {
        var serviceResponse = new ServiceResponse<List<UserContactDto>>();

        try
        {
            serviceResponse.Data = await userContactService.GetUserContacts();
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpGet("friend-requests")]
    public async Task<ActionResult<ServiceResponse<List<UserContactDto>>>> GetPendingList()
    {
        var serviceResponse = new ServiceResponse<List<UserContactDto>>();
        try
        {
            serviceResponse.Data = await userContactService.GetPendingRequest();
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpPut("accept-request/{userContactId}")]
    public async Task<ActionResult<ServiceResponse<UserContactDto>>> AcceptRequest(int userContactId)
    {
        var serviceResponse = new ServiceResponse<UserContactDto>();

        try
        {
            serviceResponse.Data = await userContactService.UpdateFriendRequest(userContactId, true);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpPut("reject-request/{userContactId}")]
    public async Task<ActionResult<ServiceResponse<UserContactDto>>> RejectRequest(int userContactId)
    {
        var serviceResponse = new ServiceResponse<UserContactDto>();
        try
        {
            serviceResponse.Data = await userContactService.UpdateFriendRequest(userContactId, false);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpGet("friends")]
    public async Task<ActionResult<ServiceResponse<List<UserDto>>>> GetContacts()
    {
        var serviceResponse = new ServiceResponse<List<UserDto>>();
        try
        {
            serviceResponse.Data = await userContactService.GetContacts();
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }
}