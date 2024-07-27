using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("User")]
public class User(Guid id, string firstname, string lastname, string email, string password, string phoneNumber)
{
    [Key]
    public Guid Id { get; set; } = id;

    [Column("firstname")]
    [Required]
    [MaxLength(100)]
    public string Firstname { get; set; } = firstname;

    [Column("lastname")]
    [Required]
    [MaxLength(100)]
    public string Lastname { get; set; } = lastname;

    [Column ("email")]
    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = email;

    [Column ("password")]
    [Required]
    public string Password { get; set; } = password;

    [Column("phone_number")]
    [Required]
    [Length(10, 10)]
    public string PhoneNumber { get; set; } = phoneNumber;
}