export enum Statuses { ONLINE, OFFLINE, AWAY};

export type IUser = {
    id: string
    name: string,
    status: IStatus
}

export interface IChat{
    id: string
    person: IUser
    companion: IUser
    message: string
}

export interface IMessage{
    id: string
    text: string
    author_id: string
    chat_id: string
    created_at: Date
}

export interface IStatus{
    id: string
    text: string
    color: string
}

export interface IAuth extends IUser{
    is_authorized: boolean
}