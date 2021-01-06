const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/', (req,res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/top10', (req,res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req,res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    if(err.message.indexOf('Cast to ObjectId failed') !== -1)
      next({message: 'Movie Not Found.', code: 2002});
    console.log(err);
  });
});

router.put('/:movie_id', (req,res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body,{new: true});
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    if(err.message.indexOf('Cast to ObjectId failed') !== -1)
      next({message: 'Movie Not Found.', code: 2002});
    console.log(err);
  });
});

router.delete('/:movie_id', (req,res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    if(err.message.indexOf('Cast to ObjectId failed') !== -1)
      next({message: 'Movie Not Found.', code: 2002});
    console.log(err);
  });
});

router.get('/between/:start_year/:end_year', (req,res) => {
  const {start_year, end_year} = req.params;
  const promise = Movie.find({
    year: {"$gte": parseInt(start_year), '$lte': parseInt(end_year)},
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET users listing. */
router.post('/',(req, res, next) => {
  //const {title, imdb_score, category, country, year} = req.body;
  /*const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year,
  });*/

  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data) => {
    res.json({data});
  }).catch((err) => res.json(err));
});

module.exports = router;
