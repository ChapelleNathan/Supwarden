using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options): base(options){}
    
    public DataContext() {}
    public DbSet<User> Users => Set<User>();
    public DbSet<Password> Passwords => Set<Password>();
    public DbSet<UserContact> UserContacts => Set<UserContact>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<UserGroup> UserGroups => Set<UserGroup>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
    }
}