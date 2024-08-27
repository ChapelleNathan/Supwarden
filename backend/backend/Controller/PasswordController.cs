using backend.DTO;
using backend.Services;
using backend.Services.PasswordService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("password")]
[Authorize]
public class PasswordController (IPasswordService passwordService)
{
    [HttpPost("")]
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
        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<PasswordDto>>>> GetAllPassword()
    {
        var serviceResponse = new ServiceResponse<List<PasswordDto>>();
        try
        {
            serviceResponse.Data = await passwordService.GetAllPassword();
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpGet("{passwordId}")]
    public async Task<ActionResult<ServiceResponse<PasswordDto>>> GetOnePassword(String passwordId)
    {
        var serviceResponse = new ServiceResponse<PasswordDto>();
        try
        {
            serviceResponse.Data = await passwordService.GetPassword(passwordId);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<PasswordDto>>> UpdatePassword(PasswordDto updatedPassword)
    {
        var serviceResponse = new ServiceResponse<PasswordDto>();
        try
        {
            serviceResponse.Data = await passwordService.UpdatePassword(updatedPassword);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpGet("group/{groupId}")]
    public async Task<ActionResult<ServiceResponse<List<PasswordDto>>>> GetPasswordsFromGroup(string groupId)
    {
        var serviceResponse = new ServiceResponse<List<PasswordDto>>();

        try
        {
            serviceResponse.Data = await passwordService.GetPasswordsFromGroup(groupId);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }
        
        return new HttpResponseHandler().Handle(serviceResponse);
    }

    [HttpDelete("{passwordId}")]
    public async Task<ActionResult<ServiceResponse<PasswordDto>>> DeletePassword(string passwordId)
    {
        var serviceResponse = new ServiceResponse<PasswordDto>();

        try
        {
            serviceResponse.Data = await passwordService.DeletePassword(passwordId);
        }
        catch (HttpResponseException e)
        {
            serviceResponse.HttpCode = e.StatusCode;
            serviceResponse.Message = e.Message;
        }

        return new HttpResponseHandler().Handle(serviceResponse);
    }
}