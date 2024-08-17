using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Group")]
public class Group
{
    [Key]
    public Guid Id { get; init; }
    
    [Column("name")]
    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }
}