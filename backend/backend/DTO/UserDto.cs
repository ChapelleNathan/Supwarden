namespace backend.DTO;

public class UserDto
{
    public required Guid Id { get; set; }
    public required string Firstname { get; set; }
    public required string Lastname { get; set; }
    public required string Email { get; set; }
    public string Token { get; set; } = "";
    public required string PhoneNumber { get; set; }
}
public abstract class AuthUserDto(string email, string password)
{
    public string Email { get; set; } = email;
    public string Password { get; set; } = password;
}

