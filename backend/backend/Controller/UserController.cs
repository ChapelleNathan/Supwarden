using backend.DTO;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("user")]
public class UserController(IUserServices userServices) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<PublicUserDto>> CreateUser(CreateUserDto userDto)
    {
        var response = await userServices.CreateUser(userDto);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PublicUserDto>> GetUser(string id)
    {
        var response = await userServices.GetUser(id);
        return Ok(response);
    }

    [HttpPost("/auth")]
    public async Task<ActionResult<PublicUserDto?>> ConnectUser(AuthUser authDto)
    {
        var response = await userServices.AuthUser(authDto);
        return Ok(response);
    }
}