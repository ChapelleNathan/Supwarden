using AutoMapper;
using backend.DTO;
using backend.Enum;
using backend.Helper;
using backend.Models;
using backend.Repository.GroupRepository;
using backend.Repository.MessageRepository;
using backend.Repository.UserRepository;

namespace backend.Services.MessageServices;

public class MessageService(IMessageRepository messageRepository, IMapper mapper, IGroupRepository groupRepository, IUserRepository userRepository) : IMessageService
{
    public async Task<List<MessageDto>> GetMessages(Guid groupId)
    {
        var messages = await messageRepository.GetMessagesFromGroupId(groupId);

        return messages.Select(message => mapper.Map<MessageDto>(message)).ToList();
    }

    public async Task<MessageDto> SaveMessage(CreateMessageDto messageDto)
    {
        var group = await groupRepository.GetGroupById(messageDto.GroupId.ToString());
        if (group is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404GroupNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var user = await userRepository.GetUser(messageDto.UserId.ToString());
        if (user is null)
        {
            var errorMessage = ErrorHelper.GetErrorMessage(ErrorMessages.Sup404UserNotFound);
            throw new HttpResponseException(404, errorMessage);
        }

        var message = await messageRepository.SaveMessage(new Message
        {
            Group = group,
            User = user,
            Text = messageDto.Text
        });

        return mapper.Map<MessageDto>(message);
    }
}