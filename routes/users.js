/**
 * Path: api/users
 */
const { Router } = require('express');
const { validateJwt } = require("../middlewares/validate-jwt");
const { getUsers } = require("../controllers/users");

const router = Router();

router.get('/', validateJwt, getUsers);

module.exports = router;
