using backend.Models;

namespace backend.Repository.MessageRepository;

public interface IMessageRepository : IRepository
{
    public Task<Message> SaveMessage(Message message);

    public Task<List<Message>> GetMessagesFromGroupId(Guid groupId);
}