import { Router } from 'express';
import restaurants from './restaurants/routes';
import users from './users/routes';
import auth from '../config/middlewares/auth'

const router = new Router();

router
  .route('/')
  .get((req, res) => {
    res.render('index', {
      user: req.user
    });
  });

router.use('/restaurants', auth, restaurants);
router.use('/users', auth, users);

export default router;
