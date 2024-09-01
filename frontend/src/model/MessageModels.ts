export interface MessageDto {
    id: number,
    username: string,
    text: string,
    userId: string,
    groupId: string,
    sendDate: Date,
    updatedAt: Date,
}

export interface CreateMessageDto {
    userId: string,
    groupId: string,
    text: string,
}