using backend.Models;

namespace backend.Repository.PasswordRepository;

public interface IPasswordRepository : IRepository
{
    public Task<Password?> CreatePassword(Password newPassword);

    public Task<List<Password>> GetAllPasswordFromUser(Guid userId);

    public Task<Password?> GetOnePasswordById(String passwordId);

    public Password UpdatePassword(Password updatedPassword);
}