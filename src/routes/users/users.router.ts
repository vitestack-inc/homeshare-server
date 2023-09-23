import express from 'express';

import { httpGetAllUsers, httpCreateUser, httpGetUserById } from './users.controller.js';
import { httpUserSignup, httpUserLogin, httpProtect } from './auth.controller.js';

const router = express.Router();

router.post('/signup', httpUserSignup);
router.post('/login', httpUserLogin);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', httpProtect, httpGetAllUsers);

router.get('/:id', httpGetUserById);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', httpCreateUser);

export default router;
