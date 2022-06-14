 const {sendSMS} = require('./message.service')
function personCreator(name, age) {
    sendSMS('olha', 'hello')
    return{
        name,
        age,
        message:() => {
            console.log(`hello, me name is ${name} and my age is ${age}`)
    }
    }
}

module.exports =  {
personCreator
}