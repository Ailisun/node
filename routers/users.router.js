const {userController} = require("../controllers");
const router = require('express').Router()

router.get('/', userController.findUsers)
router.post('/', userController.createUser)

router.get('/:userId', userController.getUserById)
router.put('/:userId',userController.updateUser)
router.delete('/:userId',userController.deleteUser)

module.exports = router