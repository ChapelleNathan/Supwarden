using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table(("Password"))]
public class Password (string name, string identifier, string sitePassword, string uri)
{
    [Key]
    public Guid Id { get; init; }

    [Column("name")]
    [Required]
    [MaxLength(100)]
    public String Name { get; set; } = name;

    [Column("identifier")]
    [Required]
    [MaxLength(100)]
    public String Identifier { get; set; } = identifier;

    [Column("password")]
    [Required]
    [MaxLength(255)]
    public String SitePassword { get; set; } = sitePassword;
    
    [Column("uri")]
    [MaxLength(255)]
    [Required]
    public String Uri { get; set; } = uri;

    [Column("note")]
    public String Note { get; set; } = "";

    [Column("user_id")]
    [Required]
    public required User User { get; set; }
}