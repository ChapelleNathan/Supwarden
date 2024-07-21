using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.UserRepository;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<User?> CreateUser(User user)
    {
        var  newUser = await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        return newUser.Entity;
    }

    public async Task<User?> GetUser(string id)
    {
        return await context.Users.FirstOrDefaultAsync(user => user.Id.ToString() == id);
    }
}