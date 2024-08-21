using backend.Models;

namespace backend.DTO;

public class PasswordDto
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string SitePassword { get; set; }
    public required string Identifier { get; set; }
    public string? Note { get; set; }
    public required string Uri { get; set; }
    public Group? Group { get; set; }
}

public class CreatePasswordDto
{
    public required string Name { get; set; }
    public required string SitePassword { get; set; }
    public required string Identifier { get; set; }
    public string Note { get; set; } = "";
    public required string Uri { get; set; }
    public string? GroupId { get; set; }
}