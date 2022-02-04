const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

// from / route we can view all thoughts and create new ones
router.route("/")
    .get(getThoughts)
    .post(createThought);

// from /:thoughtId route we can view, update or delete a single thought
router.route("/:thoughtId")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

//  from /:thoughtId/reactions we can react to a thought
router.route("/:thoughtId/reactions")
    .post(addReaction);

// from /:thoughtId/reactions/:reactionId route we can delete a reaction
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;