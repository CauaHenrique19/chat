const knex = require('../database/connection')
const bcrypt = require('bcrypt')
require("dotenv-safe").config();
const jwt = require('jsonwebtoken')

class UsersControllers{
    static create(req, res){
        const { email, password, name, confirmPassword } = req.body

        if(!email) return res.json({ message: 'E-mail não informado, Informe-o por favor!' })
        if(!name) return res.json({ message: 'Nome não informado, Informe-o por favor!' })
        if(!password) return res.json({ message: 'Senha não informada, Informe-a por favor!' })
        if(!confirmPassword) return res.json({ message: 'Confirmação de senha não informada, Informe-a por favor!' })
        if(password !== confirmPassword) return res.json({ message: 'Senhas não conferem.' })

        try{
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            knex('users')
                .insert({ email, name, password: hash })
                .then(() => res.json({ message: 'Usuário cadastrado com sucesso!' }))
        }
        catch(error){
            return res.status(500).json({ error: true, message : 'Ocorreu um erro inesperado!', messageError: error.message })
        }
    }
    static async login(req, res){
        const { email, password } = req.body

        if(!email) return res.json({ message: 'E-mail não informado, informe-o por favor!' })
        if(!password) return res.json({ message: 'Senha não informada, informe-a por favor!' })

        try{
            const user = await knex('users')
                .select('*')
                .where({ email })
                .first()

            if(!user){
                return res.status(401).json({ auth: false, message: 'Usuário não encontrado' })
            }
            else{
                if(bcrypt.compareSync(password, user.password)){
                    delete user.password
                    const token = jwt.sign({ id: user.id }, process.env.SECRET)
                    res.json({ auth: true, token, user })
                }
                else{
                    res.status(400).json({ auth: false, message: 'Senhas não conferem.' })
                }
            }
        }
        catch(error){
            return res.status(500).json({ error: true, message: 'Ocorreu um erro inesperado ao realizar o login!', messageError: error.message })
        }
    }
    static async search(req, res){
        let { value } = req.query
        value = value.toLowerCase()

        try{
            const result = await knex('users')  
                .select('id', 'name', 'email', 'socket_id')
                .where('name', 'like', `%${value}%`)
                .orWhere('email', 'like', `%${value}%`)

            if(result.length > 0){
                return res.json(result)
            }
            else{
                return res.json({ message: 'Nenhum usuário encontrado!' })
            }
        }
        catch(error){
            return res.status(500).json({ error: true, message: 'Ocorreu um erro inesperado ao tentar pesquisar usuários', messageError: error.message })
        }
    }
}

export { UsersControllers }