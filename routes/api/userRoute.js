const router = require("express").Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userController");

// from / route, we can see all users and create a new one
router.route("/")
    .get(getUsers)
    .post(createUser);

// from /:userId route, we can view, update and delete one user
router.route("/:userId")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);
    
// from /:userId/friends/:friendId we can add or delete friends
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;