using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("user-contact")]
[Authorize]
public class UserContactController
{
    
}