const { User, Thought } = require("../models");

module.exports = {
    // view all the users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // view one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `no user with that id exists you fool` })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `no user with that id to update you fool` })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a user and all their thoughts.. why wont they go away in real life :'(
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: `no user with that id to delete you fool` })
                    : Thought.deleteMany({ userId: req.params.userId })
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `this user doesnt have any thoughts, i wish more people were like them` })
                    : res.json({ message: `finally, theyve been deleted` })
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a friend
    addFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { _id: req.params.friendId } } },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `this user doesnt exist you fool, how can someone who doesnt exist have friends you fool` })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a friend who has become an enemy
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true } 
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: `this user doesnt exist you fool, how can someone who doesnt exist have a friend to unfriend you fool` })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};