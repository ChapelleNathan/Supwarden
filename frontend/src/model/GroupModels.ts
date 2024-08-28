import { UserDTO } from "./UserModels"

export interface GroupDTO {
    id: string,
    name: string,
    users: UserGroupDTO[]
}

export interface LightGroupDTO {
    id: string,
    name: string,
}

export interface UserGroupDTO {
    id: string,
    user: UserDTO,
    group: LightGroupDTO,
    canEdit: boolean,
    isCreator: boolean
}