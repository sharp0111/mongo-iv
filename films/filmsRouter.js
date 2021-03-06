const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
    const producerFilter = req.query.producer;
    const releasedFilter = req.query.released;

    let query = Film.find({})
    .sort('episode')
    // .populate('characters planets species')
    .select('title producer')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');
    if (producerFilter) {
        query.where({ producer: /gary kurtz/i });
    }
    query.then(films => {
        res.json(films);
    });
    if (releasedFilter === 2005) {
        query.where({ release_date: '2005' });
    }
    query.then(films => {
        res.json(films);
    });
});

module.exports = router;
