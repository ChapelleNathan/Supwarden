using backend.DTO;
using backend.Services;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("user")]
public class UserController(IUserServices userServices) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(string id)
    {
        var response = await userServices.GetUser(id);
        return Ok(response);
    }

    [HttpGet("search")]
    public async Task<ActionResult<ServiceResponse<List<UserDto>>>> SearchUserByEmail(string email)
    {
        var serviceResponse = new ServiceResponse<List<UserDto>>();

        try
        {
            serviceResponse.Data = await userServices.SearchUserByEmail(email);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.Message = e.Message;
            serviceResponse.HttpCode = e.StatusCode;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    }
}