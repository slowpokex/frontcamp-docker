import { Router } from 'express';
import BlogsController from './controller';

const router = new Router();

router.route('/')
  /** GET /blogs */
  .get((...args) => BlogsController.find(...args))
  /** POST /blogs */
  .post((...args) => BlogsController.create(...args));


router.route('/:id')
  /** GET /blogs/:id */
  .get((...args) => BlogsController.findById(...args))
  /** PUT /blogs/:id */
  .put((...args) => BlogsController.update(...args))
  /** DELETE /blogs/:id */
  .delete((...args) => BlogsController.remove(...args));

export default router;
