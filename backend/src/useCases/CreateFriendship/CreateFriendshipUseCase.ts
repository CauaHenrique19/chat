import { Friendship } from "../../Entities/Friendship";
import { FriendshipEnum } from "../../Enums/FriendshipEnum";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { ICreateFriendshipDTO } from "./ICreateFriendshipDTO";
import { GetFriendshipDTO } from "../../DTO/GetFriendshipDTO";
import { io } from "../../server";

export class CreateFriendshipUseCase{
    constructor(
        private friendshipRepository : IFriendshipRepository,
        private userRepository: IUserRepository
    ){}

    async execute(friendship: ICreateFriendshipDTO) : Promise<GetFriendshipDTO>{
        const friendshipEntity = new Friendship({ 
            receiver_id: friendship.receiver_id,
            requester_id: friendship.requester_id,
            created_at: new Date(),
            status: FriendshipEnum.pending
        })

        const user = await this.userRepository.findById(friendshipEntity.receiver_id)
        const friendshipDb = await this.friendshipRepository.save(friendshipEntity)

        const friendshipFinal : GetFriendshipDTO = {
            solicitation: friendshipDb,
            user
        }

        io.to(`${friendshipEntity.receiver_id}`).emit('solicitation_friendship', friendshipFinal)
        return friendshipFinal
    }
}