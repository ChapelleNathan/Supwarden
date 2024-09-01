
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Authorize]
[Route("message")]
public class MessageRepository
{
    
}