import { FriendshipEnum } from "../Enums/FriendshipEnum"
import { randomUUID } from 'crypto'

export class Friendship{
    public readonly id?: string
    public requester_id: string
    public receiver_id: string
    public created_at: Date
    public status: FriendshipEnum

    constructor(props: Omit<Friendship, 'id'>, id?: string){
        Object.assign(this, props)

        if(!id){
            this.id = randomUUID()
        }
    }
}