import { Friendship } from "../../Entities/Friendship";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { IAccpetFriendshipDTO } from "./IAcceptFriendshipDTO";

export class AcceptFriendshipUseCase{
    constructor(private friendshipRepository : IFriendshipRepository){}

    async execute(friendship: IAccpetFriendshipDTO) : Promise<Friendship>{

        const friendshipDb = await this.friendshipRepository.update({ 
            id: friendship.id, 
            receiver_id: friendship.receiver_id, 
            requester_id: friendship.requester_id, 
            status: FriendshipEnum.accepted 
        })

        return friendshipDb
    }
}