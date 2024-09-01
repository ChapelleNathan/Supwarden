
using backend.DTO;
using backend.Services;
using backend.Services.MessageServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Authorize]
[Route("message")]
public class MessageController(IMessageService messageService)
{
    [HttpGet("group/{groupId}")]
    public async Task<ActionResult<ServiceResponse<List<MessageDto>>>> GetMessages(Guid groupId)
    {
        var serviceResponse = new ServiceResponse<List<MessageDto>>();

        try
        {
            serviceResponse.Data = await messageService.GetMessages(groupId);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<MessageDto>>> SaveMessage(CreateMessageDto messageDto)
    {
        var serviceResponse = new ServiceResponse<MessageDto>();

        try
        {
            serviceResponse.Data = await messageService.SaveMessage(messageDto);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    }
}