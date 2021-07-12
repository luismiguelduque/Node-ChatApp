/**
 * Path: api/login
 */
const { Router } = require('express');
const {check} = require("express-validator");

const {validateJwt} = require("../middlewares/validate-jwt");

const {createUser, loginUser, renewJWT} = require("../controllers/auth");
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();

router.post('/new', [
    check('name', "The name field is required").not().isEmpty(),
    check('email', "The email field is required").not().isEmpty(),
    check('email', "The email field must be a valid email").isEmail(),
    check('password', "The password field is required").not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', "The email field is required").not().isEmpty(),
    check('email', "The email field must be a valid email").isEmail(),
    check('password', "The password field is required").not().isEmpty(),
    validateFields
], loginUser);

router.get('/renew', validateJwt, renewJWT);


module.exports = router;