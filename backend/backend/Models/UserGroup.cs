using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("User_Group")]
public class UserGroup
{
    [Key]
    public Guid Id { get; init; }
    
    [Column("user_id")]
    [Required]
    public required User User { get; init; }
    
    [Column("group_id")]
    [Required]
    public required Group Group { get; init; }

    [Column("Can_Edit")]
    public bool CanEdit { get; set; }

    [Column("Is_Creator")]
    public bool IsCreator { get; set; }
}