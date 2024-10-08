using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.UserRepository;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<User> CreateUser(User user)
    {
        var  newUser = await context.Users.AddAsync(user);
        return newUser.Entity;
    }

    public async Task<User?> GetUser(string id)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Id.ToString() == id);
    }

    public async Task<User?> FindUserByEmail(string email)
    {
        var user = await context.Users.FirstOrDefaultAsync(user => user.Email == email);
        return user;
    }

    public async Task<List<User>> SearchUserByEmail(string email)
    {
        return await context.Users
            .Where(user => user.Email.Contains(email))
            .Take(15)
            .ToListAsync();
    }

    public void Save()
    {
        context.SaveChanges();
    }
}