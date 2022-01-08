const Game = require('../models/Game');

exports.getGame = async (req, res) => {
  try {
    const data = await Game.query().findById(req.params.id);
    if (!data) {
      return res.status(404).send("A game with this ID was not found.");
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.getGames = async (req, res) => {
  try {
    const data = await Game.query().where("userId", req.query.userId);
    return res.status(200).json({ games: data });
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.insertGame = async (req, res) => {
  try {
    if (req.body.id && await Game.query().findById(req.body.id)) {
      return res.status(409).send("A game with this ID already exists.");
    }

    const existingGame = await Game.query().findOne({
      userId: req.body.userId,
      title: req.body.title
    });
    if (existingGame && existingGame.id !== req.body.id) {
      return res.status(409).send("A game with this title already exists.");
    }

    const data = await Game.query().insert(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.upsertGame = async (req, res) => {
  try {
    const existingGame = await Game.query().findOne({
      userId: req.body.userId,
      title: req.body.title
    });

    if (existingGame && Number(existingGame.id) !== req.body.id) {
      return res.status(409).send("A game with this title already exists. (update)");
    }

    let data;
    if (await Game.query().findById(req.body.id)) {
      data = await Game.query().patchAndFetchById(req.body.id, req.body);
    } else {
      data = await Game.query().insert(req.body);
    }
   
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.deleteGame = async (req, res) => {
  try {
    const data = await Game.query().deleteById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}