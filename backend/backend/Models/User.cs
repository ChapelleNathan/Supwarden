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
    public string Firstname { get; set; } = string.Empty;

    [Column("lastname")]
    [Required]
    [MaxLength(100)]
    public string Lastname { get; set; } = string.Empty;

    [Column ("email")]
    [Required]
    [MaxLength(100)]
    public required string Email { get; set; }

    [Column("password")]
    [MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    [Column("phone_number")]
    [Length(10, 10)]
    [MaxLength(10)]
    public string PhoneNumber { get; set; } = string.Empty;

    [Column("code_pin")]
    [MaxLength(100)]
    public String? CodePin { get; set; }

    [Column("authenfied_with_google")]
    [Required]
    public bool IdentifiedWithGoogle { get; set; } = false;

}