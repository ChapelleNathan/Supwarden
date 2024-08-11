using backend.DTO;
using backend.Services;
using backend.Services.PasswordService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("password")]
public class PasswordController (IPasswordService passwordService)
{
    [HttpPost("")]
    [Authorize]
    public async Task<ActionResult<ServiceResponse<PasswordDto>>> CreatePassword(CreatePasswordDto newPassword)
    {
        var serviceResponse = new ServiceResponse<PasswordDto>();
        try
        {
            serviceResponse.Data = await passwordService.CreatePassword(newPassword);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }
        return serviceResponse;
    } 
}