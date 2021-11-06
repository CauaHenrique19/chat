import { User } from "../Entities/User";

export interface IAuthenticatedDTO{
    token: string
    user: User
    auth: Boolean
}