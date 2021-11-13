import { Friendship } from "../../Entities/Friendship";
import { User } from "../../Entities/User";

export interface GetFriendshipByReceiverDTO{
    solicitation: Friendship
    user: User
}