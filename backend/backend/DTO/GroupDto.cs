using backend.Models;

namespace backend.DTO;

public class GroupDto : LightGroupDto
{
    public required List<UserGroupDto> Users { get; set; }
}

public class LightGroupDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
}