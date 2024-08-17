using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.PasswordRepository;

public class PasswordRepository(DataContext context) : IPasswordRepository
{
    public async Task<Password?> CreatePassword(Password newPassword)
    {
        var password = await context.Passwords.AddAsync(newPassword);
        return password.Entity;
    }

    public async Task<List<Password>> GetAllPasswordFromUser(Guid userId)
    {
        var passwords = await context.Passwords.Where(password => password.User.Id == userId)
            .Include(password => password.Group)
            .ToListAsync();
        return passwords;
    }

    public async Task<Password?> GetOnePasswordById(String passwordId)
    {
        return await context.Passwords.FirstOrDefaultAsync(password => password.Id.ToString() == passwordId);
    }

    public Password UpdatePassword(Password updatedPassword)
    {
        var password = context.Passwords.Update(updatedPassword);
        return password.Entity;
    }

    public void Save()
    {
        context.SaveChanges();
    }
}