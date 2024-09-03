using backend.Models;

namespace backend.Repository.PasswordRepository;

public interface IPasswordRepository : IRepository
{
    public Task<Password?> CreatePassword(Password newPassword);

    public Task<List<Password>> GetAllPasswordFromUser(Guid userId, List<Guid>? groupIds = null);

    public Task<Password?> GetOnePasswordById(String passwordId);

    public Password UpdatePassword(Password updatedPassword);

    public Task<List<Password>> GetPasswordsFromGroup(string groupId);

    public void DeletePassword(Password passwordId);
}