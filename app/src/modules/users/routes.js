import { Router } from 'express';
import UserController from './controller';

const router = new Router();

router.route('/')
  /** GET /users */
  .get((...args) => UserController.find(...args))
  /** POST /users */
  .post((...args) => UserController.create(...args));


router.route('/:id')
  /** GET /users/:id */
  .get((...args) => UserController.findById(...args))
  /** PUT /users/:id */
  .put((...args) => UserController.update(...args))
  /** DELETE /users/:id */
  .delete((...args) => UserController.remove(...args));

export default router;
