/**
 * Path: api/messages
 */
const { Router } = require('express');
const { validateJwt } = require("../middlewares/validate-jwt");
const { getChatMessages } = require("../controllers/messages");

const router = Router();

router.get('/:from', validateJwt, getChatMessages);

module.exports = router;
