'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Person Schema
 */
var PersonSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please enter Person name',
        trim: true
    },
    phoneNumber: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        required: 'Please enter State'
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

mongoose.model('Person', PersonSchema);
