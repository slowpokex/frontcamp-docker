import { Router } from 'express';
import httpStatus from 'http-status';
import users from './users/routes';
import blogs from './blogs/routes'
import auth from '../config/middlewares/auth'

const router = new Router();

router.route('/').all((req, res, next) => {
    res.status(httpStatus.OK).json({ message: 'hello, user' });
});

router.use('/users', auth, users);
router.use('/blogs', auth, blogs);

export default router;
