using backend.Context;
using backend.Models;
using backend.Repository.MessageRepository;
using backend.Services.MessageServices;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class ChatHub(SharedDb sharedDb, IMessageService messageService): Hub
{
    public async Task JoinChatRoom(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.Chatroom);

        sharedDb.Connections[Context.ConnectionId] = connection;

        await Clients.Group(connection.Chatroom)
            .SendAsync("JoinedRoom", "admin", $"{connection.Username} has joined {connection.Chatroom}");
    }

    public async Task SendMessage(string message)
    {
        if (sharedDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
        {
            await Clients.Group(connection.Chatroom)
                .SendAsync("ReceivedMessage", connection.Username, message, DateTime.UtcNow, connection.UserId);
        }
    }
}