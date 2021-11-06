import { randomUUID } from 'crypto'

export class User{
    public readonly id?: string
    public email: string
    public password?: string
    public name: string
    public key_image: string
    public url_image: string

    constructor(props: Omit<User, 'id'>, id?: string){
        Object.assign(this, props)

        if(!id){
            this.id = randomUUID();
        }
    }
}