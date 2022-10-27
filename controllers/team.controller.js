const Team = require('../models/team');
// Team Get Routes
exports.getTeamByParameter = async(req,res) => {
    try{
        const team = await Team.findById(req.params.idTeam).populate(['group', 'games']);
        if(!team) throw new Error

        const response = {
            team: {
                id: team._id,
                name: team.name,
                continent: team.continent,
                status: team.status ? 'Participating' : 'Disqualified',
                points: team.points,
                goalsFor: team.goalsFor,
                goalsAgainst: team.goalsAgainst,
                gamesPlayed: team.gamesPlayed,
                group: {
                    id: team.group._id,
                    name: team.group.name
                },
                updatedAt: team.updatedAt
            }
        }

        if(req.query.wgames == 1){
            response.games = team.games.map(game => {
                return {
                    id: game._id,
                    typeGame: game.typeGame,
                    date: game.date,
                    updatedAt: game.updatedAt
                }
            })
        }
        response.request = {
            type: 'GET',
            url: req.baseUrl + req.url
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: `Error getting team with id:${req.params.idTeam}`
        });
    };
};

exports.getTeamByQuery = async(req,res) => {
    try{
        if(req.query.name == undefined){
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
        const team = await Team.findOne({name: name}).populate(['group', 'games']);
        
        if(!team) throw new Error

        const response = {
            team: {
                id: team._id,
                name: team.name,
                continent: team.continent,
                status: team.status ? 'Participating' : 'Disqualified',
                points: team.points,
                goalsFor: team.goalsFor,
                goalsAgainst: team.goalsAgainst,
                gamesPlayed: team.gamesPlayed,
                group: {
                    id: team.group._id,
                    name: team.group.name
                },
                updatedAt: team.updatedAt
            }
        }
        if(req.query.wgames == 1){
            response.games = team.games.map(game => {
                return {
                    id: game._id,
                    typeGame: game.typeGame,
                    date: game.date,
                    updatedAt: game.updatedAt
                }
            })
        }

        response.request = {
            type: 'GET',
            url: req.baseUrl + req.url
        }

        return res.send(response);
        
    }catch(err){
        return res.status(400).send({
            error: `Error getting team with name: ${req.query.name}`
        });
    };
};

exports.getTeams = async(req,res) => {
    try{
        if(!(req.query.group == undefined)){
            const group = await Group.findOne({name: req.query.group});
            const teams = await Team.find({group: group._id});

            const response = {
                teams: teams.map(team => {
                    return {
                        id: team._id,
                        name: team.name,
                        continent: team.continent,
                        status: team.status ? 'Participating' : 'Disqualified',
                        points: team.points,
                        goalsFor: team.goalsFor,
                        goalsAgainst: team.goalsAgainst,
                        games: team.games,
                        gamesPlayed: team.gamesPlayed,
                        updatedAt: team.updatedAt
                    }
                }),
                group: {
                    id: group.id,
                    name: group.name,
                    updatedAt: group.updatedAt
                },
                request: {
                    type: 'GET',
                    url: req.baseUrl + req.url
                }
            }
            
            return res.send(response);
        };
        const teams = await Team.find().populate('group');
        
        const response = {
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    games: team.games,
                    gamesPlayed: team.gamesPlayed,
                    group: {
                        id: team.group._id,
                        name: team.group.name
                    },
                    updatedAt: team.updatedAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all teams'
        });
    };
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