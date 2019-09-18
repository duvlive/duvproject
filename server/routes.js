import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

// user routes.
router.route('/api/v1/users')
.post(UserController.createUser);

router.route('/api/v1/users/activate')
.get(UserController.activateUser);
router.route('/api/v1/users/login')
.post(UserController.userLogin);
router.route('/api/v1/users/password-reset')
.post(UserController.passwordReset);
router.route('/api/v1/users/update-password')
.post(UserController.updatePassword);


export default router;