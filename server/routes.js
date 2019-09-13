import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

// user routes.
router.route('/api/v1/users')
.post(UserController.createUser);

router.route('/api/v1/activate/users')
.get(UserController.activateUser);

export default router;