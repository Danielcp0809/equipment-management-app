import { Equipment } from "./equipment.model";

export interface User{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
    equipment?: Equipment[]
}