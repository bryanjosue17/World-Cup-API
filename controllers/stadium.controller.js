const Stadium = require('../models/stadium');

//get stadium
exports.getStadium = async(req,res) => {
    try{
        const stadium = await Stadium.find();

        const reponse = {
            stadium: stadium.map(stadium => {
                return {
                    id: stadium._id,
                    name: stadium.name,
                    capacity: stadium.capacity,
                    location: stadium.location,
                    totalPlays: stadium.totalPlays,
                    createdAt: stadium.createdAt
                }
            }),
            request: {
                type: 'GET',
                url: req.baseUrl + req.url
            }
        }
        return res.send(reponse);
    }catch(err){
        return res.status(400).send({
            error: 'Error getting all groups'
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

exports.editStadium = async(req,res) => {
    try{

        const stadium = await Stadium.findByIdAndUpdate(req.params.idStadium, req.body, {new: true});
        return res.send({stadium});
    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'Error editing stadium'
        });
    };
};

exports.deleteStadium = async(req,res) => {
    try{

        await Stadium.findByIdAndDelete(req.params.idStadium);

        return res.send({ok: true})
    }catch(err){
        return res.status(400).send({
            error: 'Error deleting stadium'
        })
    }
};

