import { IFriendshipRepository } from "../../Repositories/FriendshipRepository/IFriendshipRepository";
import { IUserRepository } from "../../Repositories/UserRepository/IUserRepository";
import { GetFriendshipDTO } from "../../DTO/GetFriendshipDTO";

export class GetSolicitationsByReceiverUseCase{
    constructor(
        private friendshipRepository: IFriendshipRepository,
        private userRepository: IUserRepository
    ){}

    async execute(receiverId: string) : Promise<GetFriendshipDTO[]>{
        const solicitations = await this.friendshipRepository.getSolicitationsByReceiver(receiverId)

        const solicitationsWithUsers = Promise.all(solicitations.map(async (solicitation) => {
            const user = await this.userRepository.findById(solicitation.requester_id)
            const newSolicitation : GetFriendshipDTO = {
                solicitation,
                user
            }

            return newSolicitation
        }))

        return solicitationsWithUsers
    }
}