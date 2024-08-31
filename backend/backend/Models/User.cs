using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("User")]
public class User
{
    [Key]
    public Guid Id { get; init; }

    [Column("firstname")]
    [Required]
    [MaxLength(100)]
    public required string Firstname { get; set; }

    [Column("lastname")]
    [Required]
    [MaxLength(100)]
    public required string Lastname { get; set; }

    [Column ("email")]
    [Required]
    [MaxLength(100)]
    public required string Email { get; set; }

    [Column ("password")]
    [Required]
    [MaxLength(100)]
    public required string Password { get; set; }

    [Column("phone_number")]
    [Required]
    [Length(10, 10)]
    [MaxLength(10)]
    public required string PhoneNumber { get; set; }

    [Column("code_pin")]
    [MaxLength(100)]
    public String? CodePin { get; set; }
}