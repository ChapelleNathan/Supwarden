using backend.DTO;
using backend.Services;
using backend.Services.GroupService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Authorize]
[Route("group")]
public class GroupController(IGroupService groupService)
{
    [HttpPost]
    public async Task<ActionResult<ServiceResponse<GroupDto>>> CreateGroup(string groupName)
    {
        var serviceResponse = new ServiceResponse<GroupDto>();
        try
        {
            serviceResponse.Data = await groupService.CreateGroup(groupName);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    } 
}