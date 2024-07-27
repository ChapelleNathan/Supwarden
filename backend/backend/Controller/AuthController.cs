using backend.DTO;
using backend.Services;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("auth")]
public class AuthController (IAuthService authService)
{
    [HttpPost("/signin")]
    public async Task<ActionResult<ServiceResponse<PublicUserDto>>> Signin(CreateUserDto userDto)
    {
        var serviceResponse = new ServiceResponse<PublicUserDto>();
        try
        {
            serviceResponse.Data = await authService.Signin(userDto);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpPost("/login")]
    public async Task<ActionResult<ServiceResponse<PublicUserDto>>> Login(AuthUserDto userDto)
    {
        var serviceResponse = new ServiceResponse<PublicUserDto>();
        try
        {
            serviceResponse.Data = await authService.Login(userDto);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }
}