const Group = require('../models/group');
const Team = require('../models/team');

// Group Get Routes
exports.getGroupByParameter = async (req, res) => {
    try {
        const group = await Group.findById(req.params.idGroup);
        const teams = await Team.find({ group: group._id });

        const response = {
            group: {
                id: group._id,
                name: group.name,
                createdAT: group.createdAt
            },
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    gamesPlayed: team.gamesPlayed,
                    createdAt: team.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    } catch (err) {
        return res.status(400).send({
            error: `Error getting group with id:${req.params.idGroup}`
        });
    };
};
exports.getGroupByQuery = async (req, res) => {

    try {
        if (req.query.name == undefined) {
            return res.status(400).send({
                error: 'Error no query declared'
            });
        };
        const group = await Group.findOne({ name: req.query.name });
        const teams = await Team.find({ group: group._id });

        const response = {
            group: {
                id: group._id,
                name: group.name,
                createdAT: group.createdAt
            },
            teams: teams.map(team => {
                return {
                    id: team._id,
                    name: team.name,
                    continent: team.continent,
                    status: team.status ? 'Participating' : 'Disqualified',
                    points: team.points,
                    goalsFor: team.goalsFor,
                    goalsAgainst: team.goalsAgainst,
                    gamesPlayed: team.gamesPlayed,
                    createdAt: team.createdAt
                }
            }).sort((a, b) => {
                return b.points - a.points
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }

        return res.send(response);
    } catch (err) {
        return res.status(400).send({
            error: `Error getting group with name: ${req.query.name}`
        });
    };
};
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();

        const reponse = {
            groups: groups.map(group => {
                return {
                    id: group._id,
                    name: group.name,
                    createdAt: group.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }
        return res.send(reponse);
    } catch (err) {
        return res.status(400).send({
            error: 'Error getting all groups'
        });
    };
};

// Group Data
exports.createGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        return res.send({ group });
    } catch (err) {
        return res.status(400).send({
            error: 'Error creating group'
        });
    };
};



exports.editGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.idGroup, req.body, { new: true });
        return res.send({ group });
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            error: 'Error editing group'
        });
    };
};

exports.deleteGroup = async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.idGroup);
        return res.send({ ok: true })
    } catch (err) {
        return res.status(400).send({
            error: 'Error deleting group'
        })
    }
};
