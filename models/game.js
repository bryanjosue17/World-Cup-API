const mongoose = require('../database');

const GameSchema = new mongoose.Schema({
    typeGame:{
        type: String,
        required: true
    },
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        required: true
    },
    visitingTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        required: true
    },
    homeGoals: {
        type: String,
        default: 0,
        required: true
    },
    visitingGoals: {
        type: String,
        default: 0,
        required: true
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stadiums',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Games', GameSchema);

GameSchema.pre('save', (next) => {
    this.updateAt = Date.now()
    next()
})

module.exports = Game;