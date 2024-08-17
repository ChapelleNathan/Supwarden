namespace backend.DTO;

public class UserGroupDto
{
    public required string Id { get; set; }
    public required UserDto User { get; set; }
    public bool CanEdit { get; set; }
    public bool IsCreator { get; set; }
}