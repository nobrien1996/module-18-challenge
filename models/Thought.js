const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');


//THOUGHTS
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to leave your thought',
            minLength: 1,
            maxLength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;