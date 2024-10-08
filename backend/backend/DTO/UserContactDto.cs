using backend.Enum;

namespace backend.DTO;

public class UserContactDto
{
    public required int Id { get; init; }
    public required UserDto User1 { get; init; }
    public required UserDto User2 { get; init; }
    public required ContactRequestEnum Status { get; set; }
}

public class CreateUserContactDto
{
    public required UserDto User1 { get; init; }
    public required UserDto User2 { get; init; }
    public required ContactRequestEnum Status { get; set; }
}

public class GetUserContactDto
{
    public required string User1Id { get; set; }
    public required string User2Id { get; set; }
}