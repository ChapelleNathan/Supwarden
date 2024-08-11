using backend.Models;

namespace backend.Repository.UserRepository;

public interface IUserRepository : IRepository
{
    public Task<User?> CreateUser(User user);
    public Task<User?> GetUser(string id);

    public Task<User?> FindUserByEmail(string email);
}