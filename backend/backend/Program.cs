using System.Text;
using backend.Context;
using backend.Helper;
using backend.Hubs;
using backend.Repository.GroupRepository;
using backend.Repository.MessageRepository;
using backend.Repository.PasswordRepository;
using backend.Repository.UserContactRepository;
using backend.Repository.UserGroupRepository;
using backend.Repository.UserRepository;
using backend.Services.AuthService;
using backend.Services.GroupService;
using backend.Services.MessageServices;
using backend.Services.PasswordService;
using backend.Services.UserContactService;
using backend.Services.UserServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

var databaseConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");


if (databaseConnectionString is null)
{
    databaseConnectionString = builder.Configuration.GetConnectionString("DevConnection");
}

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(databaseConnectionString)
);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "localhost", policy =>
    {
        policy.WithOrigins("http://localhost:8000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!))
    };
});

//User
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserServices, UserServices>();

//Auth
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<AuthHelper>();


//Password
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IPasswordRepository, PasswordRepository>();

//UserContact
builder.Services.AddScoped<IUserContactRepository, UserContactRepository>();
builder.Services.AddScoped<IUserContactService, UserContactService>();

//Group
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupService, GroupService>();

//UserGroup
builder.Services.AddScoped<IUserGroupRepository, UserGroupRepository>();

//Message
builder.Services.AddSingleton<SharedDb>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IMessageService, MessageService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("localhost");
app.MapHub<ChatHub>("/api/chat");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();