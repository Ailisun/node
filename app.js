const {personCreator} = require('./services/user.service')
 require('./services/file.service')

const user = personCreator('olha', 22)

console.log(user)
user.message()