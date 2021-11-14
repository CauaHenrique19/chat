import { Friendship } from "../Entities/Friendship";
import { User } from "../Entities/User";

export interface GetFriendshipDTO{
    solicitation: Friendship
    user: User
}