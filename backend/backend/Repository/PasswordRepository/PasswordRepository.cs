using backend.Context;
using backend.Models;

namespace backend.Repository.PasswordRepository;

public class PasswordRepository(DataContext context) : IPasswordRepository
{
    public async Task<Password?> CreatePassword(Password newPassword)
    {
        var password = await context.Passwords.AddAsync(newPassword);
        return password.Entity;
    }

    public void Save()
    {
        context.SaveChanges();
    }
}