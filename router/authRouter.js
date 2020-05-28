const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {tokenKey} = require('../key');


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, '  ', password);

    try{        
        const user = new User({ email: email, password: password });
        await user.save();
        const token = jwt.sign({userId: user._id}, tokenKey);
        res.send({ token });
    }catch (err){
        return res.send(`ERROR: ${err.message}`); 
    }


router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.send({error: 'Provide email or password'});
    }
    const user = await User.findOne({email});
    if (!user) {
        return res.send({ error: 'Invalid email or password' });

    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, tokenKey);
        res.send({ token });
    }catch{
        return res.send({ error: 'Invalid email or password' });
    }
    
})
 
    
});



module.exports = router ;
