'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Movie Schema
 */
var MovieSchema = new Schema({
    title: {
        type: String,
        required: 'Movie title required',
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    poster: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        required: 'Movie URL required',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Movie', MovieSchema);
