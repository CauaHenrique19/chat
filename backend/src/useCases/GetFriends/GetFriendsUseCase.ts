import { User } from "../../Entities/User";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";

export class GetFriendsUseCase{
    constructor(private friendshipRepository: IFriendshipRepository){}

    async execute(userId: string) : Promise<User[]>{
        const friends = await this.friendshipRepository.getFriends(userId)
        return friends
    }
}