const { User, Thought} = require('../models');

const userController = {
    //GET ALL
    async getUsers(req, res) {
        try {
            const dbUserData = await User.find().select('-__v');
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //GET ONE BY ID
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId }).select('-__v').populate('friends').populate('thoughts');
            if (!dbUserData) {
                return res.status(404).json({ message: 'This user doesn`t exist' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //CREATE NEW
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //UPDATE
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'This user doesn`t exist' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //DELETE
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!dbUserData) {
                return res.status(404).json({ message: 'This user doesn`t exist' });
            }
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            res.json({ message: 'This user and their thoughts have been purged' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //ADD FRIEND
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'This user doesn`t exist' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //REMOVE FRIEND
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!dbUserData) {
                return res.status(404).json({ message: 'This user doesn`t exist' });
            }
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};



module.exports = userController;