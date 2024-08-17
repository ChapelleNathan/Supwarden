using backend.DTO;

namespace backend.Services.GroupService;

public interface IGroupService
{
    public Task<GroupDto> CreateGroup(string groupName);
}