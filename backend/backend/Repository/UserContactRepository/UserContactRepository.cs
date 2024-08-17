using backend.Context;
using backend.Models;

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
            .Where(userContact => userContact.User1 == connectedUser)
            .Count(userContact => userContact.User2 == contact);
        
        return areFriend != 0;
    }
}