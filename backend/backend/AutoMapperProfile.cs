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
        CreateMap<UserDto, User>()
            .ForMember(dest => dest.Password, opt => opt.Ignore());

        //PASSWORD
        CreateMap<CreatePasswordDto, Password>();
        CreateMap<Password, PasswordDto>();
        CreateMap<PasswordDto, Password>();

        //USER_CONTACT
        CreateMap<UserContact, UserContactDto>();

        //GROUP
        CreateMap<Group, GroupDto>();
        CreateMap<Group, LightGroupDto>();

        //USER_GROUP
        CreateMap<UserGroup, UserGroupDto>();
        CreateMap<UserGroupDto, UserGroup>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
            .ForMember(dest => dest.Group, opt => opt.Ignore());
    }
}