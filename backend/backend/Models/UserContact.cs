using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Enum;

namespace backend.Models;

[Table("User_Contact")]
public class UserContact
{
    [Key]
    public int Id { get; init; }
    
    [Column("User1")]
    [Required]
    public required User User1 { get; init; }
    
    [Column("User2")]
    [Required]
    public required User User2 { get; init; }

    [Column("request_status")]
    public ContactRequestEnum Status { get; set; } = ContactRequestEnum.Pending;
}