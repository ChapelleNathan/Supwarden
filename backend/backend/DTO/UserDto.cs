namespace backend.DTO;

public class UserDto : PublicUserDto
{
    public string PhoneNumber { get; set; }
}

public class PublicUserDto
{
    public Guid Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Email { get; set; }
}

public class CreateUserDto
{
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Password { get; set; }
}

public class AuthUser
{
    public string Email { get; set; }
    public string Password { get; set; }
}

