import knex from "../database/connection"

class FriendshipController{
    static create(req, res){
        const { requester_id, receiver_id } = req.body

        const friendship = {
            requester_id,
            receiver_id,
            status: 'pending'
        }

        try{
            knex('friendship')
                .insert(friendship)
                .then(() => res.json({ message: 'Solicitação de amizade enviada' }))
        }
        catch(error){
            res.status(500).json({ error: true, message: 'Ocorreu um erro inesperado', messageError: error.message })
        }
    }
    static update(req, res){
        const id = req.params
        
        try{
            knex('friendship')
                .update({ status: 'accepted' })
                .where(id)
                .then(() => res.json({ message: 'Solicitação de amizade aceita' }))
        }
        catch(error){
            res.status(500).json({ error: true, message: 'Ocorreu um erro inesperado ao tentar aceitar a solicitação de amizade', messageError: error.message })
        }
    }
    static async getFriends(req, res){
        const userId = parseInt(req.params.userId)
        let friends
        try{
            friends = await knex('friendship')
                .select('friendship.id as friendship_id', 'friendship.receiver_id as friend_id', 'users.name as friend_name', 
                        'users.email as friend_email', 'users.socket_id as friend_socket_id')
                .where({ requester_id: userId, status: 'accepted' })
                .join('users', 'users.id', '=', 'friendship.receiver_id')

            if(friends.length > 0){
                res.json(friends)
            }
            else if(friends.length == 0){
                friends = await knex('friendship')
                    .select('friendship.id as friendship_id', 'friendship.requester_id as friend_id', 'users.name as friend_name', 
                            'users.email as friend_email', 'users.socket_id as friend_socket_id')
                    .where({ receiver_id: userId, status: 'accepted' })
                    .join('users', 'users.id', '=', 'friendship.requester_id')

                res.json(friends)
            }
        }
        catch(error){ 
            res.status(500).json({ error: true, message: 'Ocorreu um erro inesperado ao tentar buscar amigos', messageError: error.message })
        }
    }
}

export { FriendshipController }