using backend.DTO;

namespace backend.Services.PasswordService;

public interface IPasswordService
{
    public Task<PasswordDto> CreatePassword(CreatePasswordDto newPassword);

    public Task<List<PasswordDto>> GetAllPassword();

    public Task<PasswordDto> GetPassword(Guid passwordId);
}