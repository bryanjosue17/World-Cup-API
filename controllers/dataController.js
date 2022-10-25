const Group = require('../models/group');
const Team = require('../models/team');
const Game = require('../models/game');
const Stadium = require('../models/stadium');


// Group Data
exports.createGroup = async(req,res) => {
    try{
        const group = await Group.create(req.body);
        return res.send({ group });
    }catch(err){
        return res.status(400).send({
            error: 'Error creating group'
        });
    };
};

// Stadium Data
exports.createStadium = async(req,res) => {
    try{
        const stadium = await Stadium.create(req.body);
        return res.send({ stadium });
    }catch(err){
        return res.status(400).send({
            error: 'Error creating group'
        });
    };
};


exports.editGroup = async(req,res) => {
    try{

        const group = await Group.findByIdAndUpdate(req.params.idGroup, req.body, {new: true});
        return res.send({group});
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'Error editing group'
        });
    };
};
exports.deleteGroup = async(req,res) => {
    try{

        await Group.findByIdAndDelete(req.params.idGroup);

        return res.send({ok: true})
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting group'
        })
    }
};

// Team Data
exports.createTeam = async(req,res) => {
    try{
        const { name, group } = req.body;

        if(await Team.findOne({name})){
            return res.status(400).send({error : 'Team already exist'});
        };
        const groupName = await Group.findOne({name: group});
        const team = await Team.create({...req.body, group: groupName._id});

        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: 'Error creating team'
        });
    };
};
exports.editTeam = async(req,res) => {
    try{

        const team = await Team.findByIdAndUpdate(req.params.idTeam, {...req.body}, {new: true}).populate('group');
        
        return res.send({team});
    }catch(err){
        return res.status(400).send({
            error: 'Error editing team'
        });
    };
};
exports.deleteTeam = async(req,res) => {
    try{

        await Team.findByIdAndDelete(req.params.idTeam);

        return res.send({ok: true});
    }catch(err){
        return res.send({
            error: 'Error deleting team'
        });
    };
};

// Game Data
exports.createGame = async(req,res) => {
    try{
        const {typeGame, homeTeam, visitingTeam, date, local, AcessCodeDev} = req.body;
  
        const homeTeamReq = await Team.findOne({name: homeTeam});
        const visitingTeamReq = await Team.findOne({name: visitingTeam});
        
        const game = await Game.create({ typeGame: typeGame, homeTeam: homeTeamReq._id, visitingTeam: visitingTeamReq._id, local: local, date: date});

        await homeTeamReq.games.push(game);
        await homeTeamReq.save();
        await visitingTeamReq.games.push(game);
        await visitingTeamReq.save();

        return res.send({game});
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'Error creating game'
        });
    };
};
exports.editGame = async(req,res) => {
    try{
        const game = await Game.findByIdAndUpdate(req.params.idGame, {...req.body}, {new:true});
        return res.send({game});
    }catch(err){
        return res.status(400).send({
            error: 'Error editing game'
        });
    };
};
exports.deleteGame = async(req,res) => {
    try{
        await Game.findByIdAndDelete(req.params.idGame);
        return res.send({ok: true});
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting game'
        });
    };
};