using Microsoft.EntityFrameworkCore;

namespace backend.Context;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options): base(options) {}
    
}