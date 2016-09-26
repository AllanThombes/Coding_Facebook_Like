var express = require('express');
var router = express.Router();
var path = require("path");
var passport = require("passport");


/* GET home page. */
router.get('*', function(req, res, next) {
    res.status(200).sendFile(path.join(appRoot, "client", "index.html"));
});

module.exports = router;
