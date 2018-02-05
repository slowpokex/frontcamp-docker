import { Router } from 'express';
import RestaurantController from './controller';

const router = new Router();

router.route('/')
  /** GET /restaurants */
  .get((...args) => RestaurantController.find(...args))
  /** POST /restaurants */
  .post((...args) => RestaurantController.create(...args));


router.route('/:id')
  /** GET /restaurants/:id */
  .get((...args) => RestaurantController.findById(...args))
  /** PUT /restaurants/:id */
  .put((...args) => RestaurantController.update(...args))
  /** DELETE /restaurants/:id */
  .delete((...args) => RestaurantController.remove(...args));

export default router;
