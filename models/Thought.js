const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to retrieve the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
