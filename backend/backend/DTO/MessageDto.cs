namespace backend.DTO;

public class MessageDto
{
    public required int Id { get; init; }
    public required string Username { get; set; }
    public required string Text { get; set; }
    public required Guid UserId { get; set; }
    public required Guid GroupId { get; set; }
    public required DateTime SendDate { get; set; }
    public required DateTime UpdatedAt { get; set; }
}

public class CreateMessageDto
{
    public required Guid UserId { get; set; }
    public required string Text { get; set; }
    public required Guid GroupId { get; set; }
}