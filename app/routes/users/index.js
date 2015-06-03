var express = require('express');
var router = express.Router();
var user = require('./userController.js');
var ejwt = require('../../middleware/jwt');

router.get('/api/v1/users', ejwt, user.list.bind(user));

router.get('/api/v1/user/:id', ejwt, user.getOne.bind(user));

router.post('/api/v1/user/', ejwt, user.create.bind(user));

router.put('/api/v1/user/:id', ejwt, user.update.bind(user));

router.delete('/api/v1/user/:id', ejwt, user.delete.bind(user));

module.exports = router;