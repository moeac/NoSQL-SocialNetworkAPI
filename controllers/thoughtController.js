const { User, Thought } = require("../models");

module.exports = {
    // view all the thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // view one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: `no thought exists you fool` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `a thought was thought but nobody thought it because the thinker doesnt exist you fool` })
                    : res.json(`a thought was thought`)
            )
            .catch((err) => res.status(500).json(err));
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `no thought to update you fool` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought (
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: `no thought to delete you fool` })
                    : User.findOneAndUpdate(
                        { ThoughtId: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `how can you delete a thought that belongs to someone who doesnt exist you fool` })
                    : res.json({ message: `finally, the thoughts are gone` })
            )
            .catch((err) => res.status(500).json(err));
    },
    // react to something
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: `how can you react to a thought that nobody thought you fool` })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // unreact to something
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true } 
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: `no thought exists you fool, how can you unreact to a thought that nobody thought you fool` })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};