const express = require('express');
const { asyncHandler } = require('../routes/utils');
const { Movie, SubGenre } = require('../db/models');
const { Sequelize } = require('../db/models')
const Op = Sequelize.Op;

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { enteredName } = req.body;

    const searchResults = await Movie.findAll({
        where: {
            name: {
                [Op.iLike]: "%" + enteredName + "%"
            }
        },
    })
    console.log(searchResults)
    if (searchResults) {
        res.json({ message: "Success", searchResult: searchResults })
        // res.json({ result: searchResults })
    } else {
        res.json({ message: "No results found" })
    }

}))



module.exports = router;
