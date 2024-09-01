using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.MessageRepository;

public class MessageRepository(DataContext context) : IMessageRepository
{
    public async Task<Message> SaveMessage(Message message)
    {
        var newMessage = await context.Messages.AddAsync(message);
        await context.SaveChangesAsync();
        return newMessage.Entity;
    }

    public async Task<List<Message>> GetMessagesFromGroupId(Guid groupId)
    {
        return await context.Messages.Where(message => message.Group.Id == groupId)
            .Include(message => message.User)
            .Include(message => message.Group)
            .ToListAsync();
    }

    public void Save()
    {
        context.SaveChanges();
    }
}