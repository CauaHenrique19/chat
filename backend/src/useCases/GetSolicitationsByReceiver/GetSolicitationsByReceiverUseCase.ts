import { Friendship } from "../../Entities/Friendship";
import { FriendshipRepository } from "../../Repositories/FriendshipRepository/FriendshipRepository";

export class GetSolicitationsByReceiverUseCase{
    constructor(private friendshipRepository: FriendshipRepository){}

    async execute(receiverId: string) : Promise<Friendship[]>{
        const solicitations = await this.friendshipRepository.getSolicitationsByReceiver(receiverId)
        return solicitations
    }
}