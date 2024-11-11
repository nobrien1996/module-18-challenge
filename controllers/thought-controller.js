const { Thought, User } = require('../models');

const thoughtController = {
    //GET ALL THOUGHTS
    async getThoughts(req, res) {
        try{
            const dbThoughtData = await Thought.find().sort({ createdAt : -1 });
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    //GET SINGLE THOUGHT
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            if (!dbThoughtData) {
                return res.status(404).json({ message : 'There aren`t any thoughts with this ID' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //CREATE THOUGHT
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'You made a thought but there`s no user with this ID' });
            }
            res.json({ message: 'You successfully made a though, congrats' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //UPDATE THOUGHT
    async updateThought(req, res) {
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'There are not thoughts with this ID'});
        }
        res.json(dbThoughtData);
        console.log(err);
        res.status(500).json(err);
    },

    //DELETE THOUGHT
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'There are no thoughts with that ID' });
            }
            const dbUserData = User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } } , {new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'You made a thought but there`s no user with this ID' });
            }
            res.json({ message: 'You deleted the thought' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    //REACT TO THOUGHT
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true});
            if (!dbThoughtData)
                return res.status(404).json({ message: 'There are no thoughts with that ID' });
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //REMOVE REACTION
    async removeReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: {reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'There are no thoughts with that ID' });
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
module.exports = thoughtController;