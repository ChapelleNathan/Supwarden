using System.Collections.Concurrent;
using backend.Models;

namespace backend.Context;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
    public ConcurrentDictionary<string, UserConnection> Connections => _connections;
}