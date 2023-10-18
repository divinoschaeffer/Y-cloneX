const express = require('express');
const bcrypt = require('bcrypt');
import { singIn } from '../middlewares/auth';

const router = express.Router();

router.post('/sign-in', singIn);

module.exports =  router;