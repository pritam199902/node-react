const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const {tokenKey} = require('../key');


module.exports =(req, res, next ) => {
    const { authorization } = req.headers ;
    if ( !authorization ) {
        return res.send({error:'You must be Logged in!'});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, tokenKey, async (err, payload) => {
        if (err){
            return res.send({error:'You must be Logged in'});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    })

};