import { Friendship } from "../../Entities/Friendship";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { ICreateFriendshipDTO } from "./ICreateFriendshipDTO";

export class CreateFriendshipUseCase{
    constructor(private friendshipRepository : IFriendshipRepository){}

    async execute(friendship: ICreateFriendshipDTO) : Promise<Friendship>{
        const friendshipEntity = new Friendship({ 
            receiver_id: friendship.receiver_id,
            requester_id: friendship.requester_id,
            status: FriendshipEnum.pending
        })

        const friendshipDb = await this.friendshipRepository.save(friendshipEntity)
        return friendshipDb
    }
}