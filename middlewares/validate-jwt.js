const {response} = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "Unauthorized",
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    }catch (error){
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: "Unauthorized"
        });
    }

}

module.exports = {
    validateJwt
};