using AutoMapper;
using backend.DTO;
using backend.Models;

namespace backend;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        //USER
        CreateMap<CreateUserDto, User>();
        CreateMap<User, ConnectedUserDto>();
        CreateMap<User, UserDto>();
        
        //PASSWORD
        CreateMap<CreatePasswordDto, Password>();
        CreateMap<Password, PasswordDto>();
        CreateMap<PasswordDto, Password>();
        
        //USER_CONTACT
        CreateMap<UserContact, UserContactDto>();
        
        //GROUP
        CreateMap<Group, GroupDto>();
        
        //USER_GROUP
        CreateMap<UserGroup, UserGroupDto>();
    }
}