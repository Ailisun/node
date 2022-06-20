const express = require('express')
const {fileService} = require("./services");

const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users)
})

app.post('/users', async (req, res) => {
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
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()

    const user = users.find((user) => user.id === +userId)

    if(!user){
        return res.status(400).json(`User with ${userId} not found`)
    }

    res.json(user)
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()

    const index = users.findIndex((user) => user.id === +userId)

    if(index === -1){
        return res.status(400).json(`User with ${userId} not found`)
    }
    users.splice(index, 1)
     await fileService.writer(users)

    res.sendStatus(204)
})

app.put('/users/:userId', async (req, res) => {
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
})


app.listen(5000, () => {
    console.log('Started on port 5000')
})