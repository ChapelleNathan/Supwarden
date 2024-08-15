using AutoMapper;
using backend.DTO;
using backend.Models;

namespace backend;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<CreateUserDto, User>();
        CreateMap<User, ConnectedUserDto>();
        CreateMap<User, UserDto>();
        CreateMap<CreatePasswordDto, Password>();
        CreateMap<Password, PasswordDto>();
        CreateMap<PasswordDto, Password>();
    }
}