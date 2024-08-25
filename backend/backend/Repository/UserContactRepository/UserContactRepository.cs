using backend.Context;
using backend.Enum;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.UserContactRepository;

public class UserContactRepository(DataContext context) : IUserContactRepository
{
    public void Save()
    {
        context.SaveChanges();
    }

    public async Task<UserContact> AddContact(UserContact newContact)
    {
        var userContact = await context.UserContacts.AddAsync(newContact);
        await context.SaveChangesAsync();
        return userContact.Entity;
    }

    public bool AreFriend(User connectedUser, User contact)
    {
        var areFriend = context.UserContacts
            .Count(userContact =>
                (userContact.User1 == connectedUser && userContact.User2 == contact) ||
                (userContact.User1 == contact && userContact.User2 == connectedUser)
            );
        return areFriend != 0;
    }

    public async Task<List<UserContact>> GetUserContact(Guid connectedUserId)
    {
        return await context.UserContacts
            .Where(userContact => userContact.User1.Id == connectedUserId || userContact.User2.Id == connectedUserId)
            .Include(userContact => userContact.User2)
            .Include(userContact => userContact.User1)
            .ToListAsync();
    }

    public async Task<List<UserContact>> GetFriendRequest(Guid connectedUserId)
    {
        return await context.UserContacts
            .Where(userContact =>
                userContact.User1.Id != connectedUserId && userContact.User2.Id == connectedUserId
                                                        && userContact.Status == ContactRequestEnum.Pending
            )
            .Include(userContact => userContact.User1)
            .Include(userContact => userContact.User2)
            .ToListAsync();
    }

    public async Task<UserContact?> GetUserContactById(int id)
    {
        return await context.UserContacts.FirstOrDefaultAsync(userContact => userContact.Id == id);
    }
}