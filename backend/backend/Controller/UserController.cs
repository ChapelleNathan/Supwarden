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
}