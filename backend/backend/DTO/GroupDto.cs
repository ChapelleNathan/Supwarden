using backend.Models;

namespace backend.DTO;

public class GroupDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required List<UserGroupDto> Users { get; set; }
}