using System.Text.Json.Serialization;

namespace backend.DTO;

public class UserDto
{
    public required Guid Id { get; set; }
    public required string Firstname { get; set; }
    public required string Lastname { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public string CodePin { get; set; } = "";
}

public class ConnectedUserDto : UserDto
{
    public string Token { get; set; } = "";
}

public class AuthUserDto(string email, string password)
{
    public string Email { get; set; } = email;
    public string Password { get; set; } = password;
}

public class CreateUserDto
{
    public required string Firstname { get; set; }
    public required string Lastname { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Password { get; set; }
}

