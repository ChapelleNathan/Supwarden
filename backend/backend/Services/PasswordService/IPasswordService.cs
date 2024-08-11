using backend.DTO;

namespace backend.Services.PasswordService;

public interface IPasswordService
{
    public Task<PasswordDto> CreatePassword(CreatePasswordDto newPassword);
}