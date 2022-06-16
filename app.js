const express = require('express')
const users = require('./dataBase/users') //просто масивчик

const app = express()
app.get('/',(req, res) => {
    console.log(req);
    res.json('Hello')
    // res.end('End') видає тільки стрічки
})

//це називається контролер
app.get('/users/:userId',(req, res) => {
    const userIndex = +req.params.userId;
    if (isNaN(userIndex) || userIndex < 0) {
        res.status(400).json('please enter valid id');
        return;
    }

    const user = users[userIndex]
    if (!user) {
        res.status(404).json(`User with id ${userIndex} not found`);
        return;
    }

    res.json(user)
} )

app.listen(5000, ()=> {
    console.log('Server listen 5000')
})


// app.get('/users', (req, res) => {
//     res.json(users)
// })