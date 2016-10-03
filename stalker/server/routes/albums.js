var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");

var ctrlAlbums = require(path.join(appRoot, "server", "controllers", "albums.js"));

/* albums */
router.get('/albums', function(req, res) {
    ctrlAlbums.readAll(req, res);
});
router.post('/albums', function(req, res) {
    ctrlAlbums.createOne(req, res);
});
router.post('/albums/:id', function(req, res) {
    ctrlAlbums.createOne(req, res);
});
router.delete('/albums/:id', function(req, res) {
    ctrlAlbums.deleteOne(req, res);
});

module.exports = router;
