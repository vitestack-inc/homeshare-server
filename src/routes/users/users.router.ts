import express from 'express';

import { httpGetAllUsers, httpCreateUser } from './users.controller.js';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', httpGetAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', httpCreateUser);

export default router;
