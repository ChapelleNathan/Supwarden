using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Helper;

public class AuthHelper
{
    private readonly IConfiguration _configuration;

    public AuthHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public static string PrivateKey { get; set; } =
        "MIICWwIBAAKBgHZO8IQouqjDyY47ZDGdw9jPDVHadgfT1kP3igz5xamdVaYPHaN24UZMeSXjW9sWZzwFVbhOAGrjR0MM6APrlvv5mpy67S/K4q4D7Dvf6QySKFzwMZ99Qk10fK8tLoUlHG3qfk9+85LhL/Rnmd9FD7nz8+cYXFmz5LIaLEQATdyNAgMBAAECgYA9ng2Md34IKbiPGIWthcKb5/LC/+nbV8xPp9xBt9Dn7ybNjy/blC3uJCQwxIJxz/BChXDIxe9XvDnARTeN2yTOKrV6mUfI+VmON5gTD5hMGtWmxEsmTfu3JL0LjDe8Rfdu46w5qjX5jyDwU0ygJPqXJPRmHOQW0WN8oLIaDBxIQQJBAN66qMS2GtcgTqECjnZuuP+qrTKL4JzG+yLLNoyWJbMlF0/HatsmrFq/CkYwA806OTmCkUSm9x6mpX1wHKi4jbECQQCH+yVb67gdghmoNhc5vLgnm/efNnhUh7u07OCL3tE9EBbxZFRs17HftfEcfmtOtoyTBpf9jrOvaGjYxmxXWSedAkByZrHVCCxVHxUEAoomLsz7FTGM6ufd3x6TSomkQGLw1zZYFfe+xOh2W/XtAzCQsz09WuE+v/viVHpgKbuutcyhAkB8o8hXnBVz/rdTxti9FG1b6QstBXmASbXVHbaonkD+DoxpEMSNy5t/6b4qlvn2+T6a2VVhlXbAFhzcbewKmG7FAkEAs8z4Y1uI0Bf6ge4foXZ/2B9/pJpODnp2cbQjHomnXM861B/C+jPW3TJJN2cfbAxhCQT2NhzewaqoYzy7dpYsIQ==";
    
    public string GenerateToken(User user)
    {
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value!);
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = GenerateClaims(user),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = credentials
        };

        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }

    private static ClaimsIdentity GenerateClaims(User user)
    {
        var claims = new ClaimsIdentity();
        claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
        return claims;
    }
}