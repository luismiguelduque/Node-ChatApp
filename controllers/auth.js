const {response} = require("express");
const bcrypt = require("bcryptjs");

const User = require('../models/user');
const {jwtGenerate} = require("../helpers/jwt");

const createUser = async (req, res = response)=>{

    const { email, password } = req.body;

    try{
        const emailExist = await User.findOne({ email });
        if(emailExist){
            return res.status(400).json({
                ok: false,
                msg: "The email already has been taken"
            });
        }

        const user = new User(req.body);

        // Password encrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await jwtGenerate(user.id);

        res.json({
            ok: true,
            msg: 'User created',
            data: user,
            token: token,
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }

}

const loginUser = async (req, res = response)=>{

    const { email, password } = req.body;

    try{
        // Validate email
        const userDB = await User.findOne({ email });
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: "The email does not exist"
            });
        }
        // Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "The password is not valid"
            });
        }

        // Generate JWT
        const token = await jwtGenerate(userDB.id);

        res.json({
            ok: true,
            msg: 'Loged in',
            data: userDB,
            token: token,
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
}

const renewJWT = async (req, res = response) => {

    const uid = req.uid;

    // Generate JWT
    const token = await jwtGenerate(uid);

    const userDB = await User.findById(uid);

    res.json({
        ok: true,
        msg: 'Loged in',
        data: userDB,
        token: token,
    });
}

module.exports = {
    createUser,
    loginUser,
    renewJWT
}