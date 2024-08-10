export interface AuthUserDto {
    email: string,
    password: string,
}

export interface CreateUserDto {
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    password: string,
}

export interface UserDto {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string
}

export interface ConnectedUserDto extends UserDto {
    token: string,
}