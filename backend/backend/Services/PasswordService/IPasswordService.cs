using backend.DTO;

namespace backend.Services.PasswordService;

public interface IPasswordService
{
    public Task<PasswordDto> CreatePassword(CreatePasswordDto newPassword);

    public Task<List<PasswordDto>> GetAllPassword();

    public Task<PasswordDto> GetPassword(String passwordId);

    public Task<PasswordDto> UpdatePassword(PasswordDto updatedPassword);

    public Task<List<PasswordDto>> GetPasswordsFromGroup(string groupId);
}