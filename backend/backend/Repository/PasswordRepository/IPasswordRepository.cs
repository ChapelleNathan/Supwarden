using backend.Models;

namespace backend.Repository.PasswordRepository;

public interface IPasswordRepository : IRepository
{
    public Task<Password?> CreatePassword(Password newPassword);
}