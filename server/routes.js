import { Router } from 'express';
import UserController from './controllers/UserController';
// import Authentication from './middleware/authentication';

const router = Router();

// user routes.
router.post('/api/v1/users', UserController.createUser);
router.post('/api/v1/users/login', UserController.userLogin);
router.post('/api/v1/users/logout', UserController.userLogout);
router.get('/api/v1/users/activate', UserController.activateUser);
router.post('/api/v1/users/password-reset', UserController.passwordReset);
router.post('/api/v1/users/update-password', UserController.updatePassword);


export default router;