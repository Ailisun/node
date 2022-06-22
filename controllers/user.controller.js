const {fileService} = require("../services");
module.exports = {

    findUsers: async (req, res) => {
        const users = await fileService.reader()
        res.json(users)
    },

    createUser: async (req, res) => {
        const {name, age} = req.body
        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('Set valid age')
        }
        if (!name || name.length < 3) {
            return res.status(400).json('Set valid name')
        }

        const users = await fileService.reader()

        const newUser = { ...req.body, id: users.length ? users[users.length - 1].id + 1 : 1 }
        await fileService.writer([...users, newUser])
        res.status(201).json(newUser)
    },

    getUserById: async (req, res) => {
        const {userId} = req.params
        const users = await fileService.reader()

        const user = users.find((user) => user.id === +userId)

        if(!user){
            return res.status(400).json(`User with ${userId} not found`)
        }

        res.json(user)
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params
        const users = await fileService.reader()

        const index = users.findIndex((user) => user.id === +userId)

        if(index === -1){
            return res.status(400).json(`User with ${userId} not found`)
        }
        users.splice(index, 1)
        await fileService.writer(users)

        res.sendStatus(204)
    },

    updateUser: async (req, res) => {
        const {name, age} = req.body
        const {userId} = req.params

        if (age && !Number.isInteger(age) || age < 18) {
            return res.status(400).json('Set valid age')
        }
        if (name && name.length < 3) {
            return res.status(400).json('Set valid name')
        }

        const users = await fileService.reader()
        const index = users.findIndex((user) => user.id === +userId)
        if(index === -1){
            return res.status(400).json(`User with ${userId} not found`)
        }

        const updateUser = Object.assign(users[index], req.body)

        users.splice(index, 1)

        await fileService.writer([...users, updateUser])

        res.status(201).json(updateUser)
    }


}