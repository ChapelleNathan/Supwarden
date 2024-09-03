using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.PasswordRepository;

public class PasswordRepository(DataContext context) : IPasswordRepository
{
    public async Task<Password?> CreatePassword(Password newPassword)
    {
        var password = await context.Passwords.AddAsync(newPassword);
        return password.Entity;
    }

    public async Task<List<Password>> GetAllPasswordFromUser(Guid userId, List<Guid>? groupIds = null)
    {
        //FIXME
        //De base sensé aller chercher tous les mdp. mêmes ceux des groups. Mais pour l'instant ça pause problème
        //Dans le front car possibilité de modifier/supprimer un mdp alors que l'utilisateurs n'a pas le droit.
        var passwords = await context.Passwords
            .Where(password => password.User.Id == userId && password.Group == null
                               //|| 
                               //password.Group != null && groupIds != null && groupIds.Contains(password.Group.Id)
                               )
            .Include(password => password.Group)
            .OrderByDescending(password => password.Id)
            .ToListAsync();
        return passwords;
    }

    public async Task<Password?> GetOnePasswordById(String passwordId)
    {
        return await context.Passwords.FirstOrDefaultAsync(password => password.Id.ToString() == passwordId);
    }

    public Password UpdatePassword(Password updatedPassword)
    {
        var password = context.Passwords.Update(updatedPassword);
        return password.Entity;
    }

    public async Task<List<Password>> GetPasswordsFromGroup(string groupId)
    {
        return await context.Passwords
            .Where(password => password.Group != null && password.Group.Id.ToString() == groupId)
            .OrderByDescending(password => password.Id)
            .ToListAsync();
    }

    public void DeletePassword(Password password)
    {
        context.Passwords.Remove(password);
        context.SaveChanges();
    }

    public void Save()
    {
        context.SaveChanges();
    }
}