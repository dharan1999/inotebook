const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');




//Create a User with POST "/api/auth". Doesn't require auth1

router.post('/createuser',[
body('name','Enter a valid name with atleast 3 characters').isLength({ min:3 }),
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password with atleast 5 characters').isLength({ min:5 }),

],async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user = await User.findOne({ email: req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry the user with the email already exists"})
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error ocurred");
    }

    
})


module.exports = router