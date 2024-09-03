import { ContactRequestEnum } from "../enum/ContactRequestEnum"

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
    identifiedWithGoogle: boolean
}

export interface ConnectedUserDTO extends UserDTO {
    token: string,
}

export interface UserContactDTO {
    id: number,
    user1: UserDTO,
    user2: UserDTO,
    status: ContactRequestEnum
}

export interface GoogleUserDTO {
    email: string,
    lastname: string,
    firstname: string,
}