import { MessageEnum } from "../Enums/MessageEnum"
import { randomUUID } from 'crypto'

export class Message{
    public readonly id?: string
    public from: string
    public to: string
    public content: string
    public created_at: Date
    public status: MessageEnum

    constructor(props: Omit<Message, 'id'>, id?: string){
        Object.assign(this, props)

        if(!id){
            this.id = randomUUID()
        }
    }
}