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

    public async Task<List<Password>> GetAllPasswordFromUser(Guid id)
    {
        var passwords = await context.Passwords.Where(password => password.User.Id == id).ToListAsync();
        return passwords;
    }

    public void Save()
    {
        context.SaveChanges();
    }
}