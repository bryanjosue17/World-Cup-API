const Game = require("../models/game");
const Stadium = require("../models/stadium");
const Team = require("../models/team");

// Game Get Routes
exports.getGameByParameter = async (req, res) => {
  try {
    const game = await Game.findById(req.params.idGame).populate([
      "homeTeam",
      "visitingTeam",
    ]);
    const stadium = await Stadium.findOne({ stadium: game.stadium });

    if (!game) throw new Error();
    const ResponseTeam = (team) => {
      return {
        id: team._id,
        name: team.name,
        continent: team.continent,
        status: team.status ? "Participating" : "Disqualified",
        points: team.points,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        gamesPlayed: team.gamesPlayed,
        group: team.group,
        updatedAt: team.updatedAt,
      };
    };
    const ResponseStadium = (stadium) => {
      return {
        id: stadium._id,
        name: stadium.name,
        capacity: stadium.capacity,
        location: stadium.location,
        totalPlays: stadium.totalPlays,
      };
    };

    const homeTeam = ResponseTeam(game.homeTeam);
    const visitingTeam = ResponseTeam(game.visitingTeam);
    const stadiumResponse = ResponseStadium(stadium);
    const response = {
      game: {
        id: game._id,
        typeGame: game.typeGame,
        date: game.date,
        homeGoals: game.homeGoals,
        visitingGoals: game.visitingGoals,
        updatedAt: game.updatedAt,
      },
      homeTeam: homeTeam,
      vistingTeam: visitingTeam,
      stadium: stadiumResponse,
      request: {
        type: "GET",
        url: req.baseUrl + req.url,
      },
    };

    return res.send(response);
  } catch (err) {
    return res.status(400).send({
      error: `Error getting game with id:${req.params.idGame}`,
    });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().populate(["homeTeam", "visitingTeam"]);
    const stadium = await Stadium.findOne({ stadium: games.stadium });

    const ResponseTeam = (team) => {
      return {
        id: team._id,
        name: team.name,
        continent: team.continent,
        points: team.points,
        group: team.group,
        updatedAt: team.updatedAt,
      };
    };
    const ResponseStadium = (stadium) => {
      return {
        id: stadium._id,
        name: stadium.name,
        capacity: stadium.capacity,
        location: stadium.location,
        totalPlays: stadium.totalPlays,
      };
    };

    const response = {
      games: games.map((game) => {
        const homeTeam = ResponseTeam(game.homeTeam);
        const visitingTeam = ResponseTeam(game.visitingTeam);
        const stadiumResponse = ResponseStadium(stadium);
        return {
          id: game._id,
          typeGame: game.typeGame,
          date: game.date,
          homeGoals: game.homeGoals,
          visitingGoals: game.visitingGoals,
          homeTeam: homeTeam,
          visitingTeam: visitingTeam,
          stadium: stadiumResponse,
          updatedAt: game.updatedAt,
        };
      }),
      request: {
        type: "GET",
        url: req.baseUrl + req.url,
      },
    };
    return res.send(response);
  } catch (err) {
    return res.status(400).send({
      error: "Error getting all games",
    });
  }
};

// Game Data
exports.createGame = async (req, res) => {
  try {
    const { typeGame, homeTeam, visitingTeam, date, stadium } = req.body;
    const homeTeamReq = await Team.findOne({ name: homeTeam });
    const visitingTeamReq = await Team.findOne({ name: visitingTeam });
    const stadiumReq = await Stadium.findOne({ name: stadium });

    const game = await Game.create({
      typeGame: typeGame,
      homeTeam: homeTeamReq._id,
      visitingTeam: visitingTeamReq._id,
      stadium: stadiumReq._id,
      date: date,
    });
    homeTeamReq.games.push(game);
    await homeTeamReq.save();
    visitingTeamReq.games.push(game);
    await visitingTeamReq.save();
    return res.send({ game });
    ;
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: "Error creating game",
    });
  }
};

exports.editGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.idGame,
      { ...req.body },
      { new: true }
    );
    return res.send({ game });
  } catch (err) {
    return res.status(400).send({
      error: "Error editing game",
    });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.idGame);
    return res.send({ ok: true });
  } catch (err) {
    return res.status(400).send({
      error: "Error deleting game",
    });
  }
};
