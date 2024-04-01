const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret ="MynameisEndtoEndYouTubeChannel$#"
router.post("/creatuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            }).then(res.json({ success: true }))


        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

    router.post("/loginuser", [
        body('email').isEmail(),
        body('password', 'Incorrect password').isLength({ min: 5 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        let email = req.body.email;
        let password = req.body.password;
    
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "User not found" });
            }
    
            const pwdCompare = await bcrypt.compare(password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }
    
            const data = {
                user: {
                    id: userData.id
                }
            };
    
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });
    
    module.exports = router;
    

/*router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        let email = req.body.email;
        let password = req.body.password;
        try {
            let userData = await User.findOne({ email });
            //console.log(userData);
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }
             
            const pwdCompare = await bcrypt.compare(userData.password,password)
            console.log(pwdCompare);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })
module.exports = router;*/

/*const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/createuser", async (req, res)=>{
    try {
        // Create a new user
        await User.create({
            name: "Shyam Das",
            password: "123456",
            email: "shyamdas12@hotmail.com",
            location: "Qwerty edrfef",
        });
        // If user creation is successful, send success:true in the response
        res.json({ success: true });
    } catch (error) {
        // If there's an error, log it and send success:false in the response
        console.error(error);
        res.json({ success: false });
    }
});

module.exports = router;*/
