import { Router } from 'express';

const router = new Router();

router.route('/').all((req, res) => {
    res.json({ message: "Hello Nikitos" });
});

export default router;