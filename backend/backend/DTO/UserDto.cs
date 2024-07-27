namespace backend.DTO;

public class UserDto(Guid id, string firstname, string lastname, string email, string token, string phoneNumber)
{
    public Guid Id { get; set; } = id;
    public string Firstname { get; set; } = firstname;
    public string Lastname { get; set; } = lastname;
    public string Email { get; set; } = email;
    public string Token { get; set; } = token;
    public string PhoneNumber { get; set; } = phoneNumber;
}

public abstract class CreateUserDto(string firstname, string lastname, string email, string phoneNumber, string password)
{
    public string Firstname { get; set; } = firstname;
    public string Lastname { get; set; } = lastname;
    public string Email { get; set; } = email;
    public string PhoneNumber { get; set; } = phoneNumber;
    public string Password { get; set; } = password;
}

public abstract class AuthUserDto(string email, string password)
{
    public string Email { get; set; } = email;
    public string Password { get; set; } = password;
}

