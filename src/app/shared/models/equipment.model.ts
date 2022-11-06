import { User } from "./user.model";

export interface Equipment{
    id: string,
    brand: string,
    model: string,
    serial: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    user?: User
}