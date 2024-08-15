using backend.Models;

namespace backend.DTO;

public class PasswordDto
{
    public required String Id { get; set; }
    public required String Name { get; set; }
    public required String SitePassword { get; set; }
    public required String Identifier { get; set; }
    public String Note { get; set; } = "";
    public required String Uri { get; set; }
}

public class CreatePasswordDto
{
    public required String Name { get; set; }
    public required String SitePassword { get; set; }
    public required String Identifier { get; set; }
    public String Note { get; set; } = "";
    public required String Uri { get; set; }
}