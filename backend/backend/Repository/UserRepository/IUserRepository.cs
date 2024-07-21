using backend.Models;

namespace backend.Repository.UserRepository;

public interface IUserRepository
{
    public Task<User?> CreateUser(User user);
    public Task<User?> GetUser(string id);
}