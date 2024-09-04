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
            Expires = DateTime.UtcNow.AddDays(7),
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