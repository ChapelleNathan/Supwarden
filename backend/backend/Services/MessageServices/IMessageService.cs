using backend.DTO;

namespace backend.Services.MessageServices;

public interface IMessageService
{
    public Task<List<MessageDto>> GetMessages(Guid groupId);

    public Task<MessageDto> SaveMessage(CreateMessageDto messageDto);
}