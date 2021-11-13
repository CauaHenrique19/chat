import { Friendship } from "../../Entities/Friendship";
import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { GetFriendshipByReceiverDTO } from "./GetFriendshipByReceiverDTO";

export class GetSolicitationsByReceiverUseCase{
    constructor(
        private friendshipRepository: IFriendshipRepository,
        private userRepository: IUserRepository
    ){}

    async execute(receiverId: string) : Promise<GetFriendshipByReceiverDTO[]>{
        const solicitations = await this.friendshipRepository.getSolicitationsByReceiver(receiverId)

        const solicitationsWithUsers = Promise.all(solicitations.map(async (solicitation) => {
            const user = await this.userRepository.findById(solicitation.requester_id)
            const newSolicitation : GetFriendshipByReceiverDTO = {
                solicitation,
                user
            }

            return newSolicitation
        }))

        return solicitationsWithUsers
    }
}