export interface PasswordDto extends CreatePasswordDto {
    id: string,
}

export interface CreatePasswordDto {
    name: string,
    identifier: string,
    sitePassword: string,
    uri: string,
    note?: string,
    groupId?: string
}