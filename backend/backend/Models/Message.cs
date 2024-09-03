using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Message")]
public class Message
{
    [Key]
    public int Id { get; init; }
    
    [Column("User")]
    [Required]
    public required User User { get; init; }
    
    [Column("Group")]
    [Required]
    public required Group Group { get; init; }
    
    [Column("Text")]
    [Required]
    public required string Text { get; set; }

    [Column("SendDate")]
    public DateTime SendDate { get; set; } = DateTime.UtcNow;

    [Column("UpdatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}