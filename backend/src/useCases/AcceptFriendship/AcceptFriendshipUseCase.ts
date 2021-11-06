import { Friendship } from "../../Entities/Friendship";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { IAccpetFriendshipDTO } from "./IAcceptFriendshipDTO";

export class AcceptFriendshipUseCase{
    constructor(private friendshipRepository : IFriendshipRepository){}

    async execute(friendship: IAccpetFriendshipDTO) : Promise<Friendship>{
        const friendshipDb = await this.friendshipRepository.update(friendship.id, FriendshipEnum.accepted )
        return friendshipDb
    }
}