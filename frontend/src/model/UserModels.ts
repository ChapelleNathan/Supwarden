export interface CreateUserDTO {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phoneNumber: string
}

export interface AuthUserDTO {
    email: string,
    password: string,
}

export interface UserDTO {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
}

export interface ConnectedUserDTO extends UserDTO {
    token: string,
}