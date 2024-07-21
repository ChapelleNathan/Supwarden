using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("User")]
public class User
{
    [Key]
    public Guid Id { get; set; }
    
    [Column("firstname")]
    [Required]
    [MaxLength(100)]
    public string Firstname { get; set; }
    
    [Column("lastname")]
    [Required]
    [MaxLength(100)]
    public string Lastname { get; set; }
    
    [Column ("email")]
    [Required]
    [MaxLength(100)]
    public string Email { get; set; }
    
    [Column ("password")]
    [Required]
    public string Password { get; set; }
    
    [Column("phone_number")]
    [Required]
    [Length(10, 10)]
    public string PhoneNumber { get; set; }
}