'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

/**
 * Movies Upload
 */
exports.upload = function(req, res) {
    console.log('In Upload method');

    var part = req.files.filefield;

    var writeStream = gfs.createWriteStream({
        filename: part.name,
        mode: 'w',
        content_type: part.mimetype
    });


    writeStream.on('close', function() {
        return res.status(200).send({
            message: 'Success'
        });
    });

    writeStream.write(part.data);

    writeStream.end();

};


/**
 * Movies Read
 */
exports.uploadRead = function(req, res) {
    console.log(req.params.filename);

    gfs.files.find({
        filename: req.params.filename
    }).toArray(function(err, files) {

        if (files.length === 0) {
            return res.status(400).send({
                message: 'File not found'
            });
        }

        res.writeHead(200, {
            'Content-Type': files[0].contentType
        });

        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });

        readstream.on('data', function(data) {
            res.write(data);
        });

        readstream.on('end', function() {
            res.end();
        });

        readstream.on('error', function(err) {
            console.log('An error occurred!', err);
            throw err;
        });
    });

};


/**
 * Create a Movie
 */
exports.create = function(req, res) {

    console.log('In SAVE');
    console.log(req.body);




    var part = req.body.filefield;
    console.log(part.name);
    /*

    var writeStream = gfs.createWriteStream({
      filename: part.name,
      mode: 'w',
      content_type: part.mimetype
    });


    writeStream.on('close', function() {
      return res.status(200).send({
        message: 'Success'
      });
    });

    writeStream.write(part.data);

    writeStream.end();



      var movie = new Movie(req.body);
      movie.user = req.user;

      movie.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(movie);
        }
      });
    */
};

/**
 * Show the current Movie
 */
exports.read = function(req, res) {
    // convert mongoose document to JSON
    var movie = req.movie ? req.movie.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    movie.isCurrentUserOwner = req.user && movie.user && movie.user._id.toString() === req.user._id.toString() ? true : false;

    res.jsonp(movie);
};

/**
 * Update a Movie
 */
exports.update = function(req, res) {
    var movie = req.movie;

    movie = _.extend(movie, req.body);

    movie.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(movie);
        }
    });
};

/**
 * Delete an Movie
 */
exports.delete = function(req, res) {
    var movie = req.movie;

    movie.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(movie);
        }
    });
};

/**
 * List of Movies
 */
exports.list = function(req, res) {
    Movie.find().sort('-created').populate('user', 'displayName').exec(function(err, movies) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(movies);
        }
    });
};

/**
 * Movie middleware
 */
exports.movieByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Movie is invalid'
        });
    }

    Movie.findById(id).populate('user', 'displayName').exec(function(err, movie) {
        if (err) {
            return next(err);
        } else if (!movie) {
            return res.status(404).send({
                message: 'No Movie with that identifier has been found'
            });
        }
        req.movie = movie;
        next();
    });
};
