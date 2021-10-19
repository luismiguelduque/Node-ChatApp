const jwt = require("jsonwebtoken");

const jwtGenerate = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: "24h",
        }, (err, token) => {
            if(err){
                reject("Error with JWT");
            }else{
                resolve(token);
            }
        });

    });

};

const validateJWT = (token = '') => {

    try{
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    }catch (error){
        return [false]
    }

}

module.exports = {
    jwtGenerate,
    validateJWT
};