import { EmailController } from '../controllers';

const emailRoutes = router => {
  router.get('/email-template', EmailController.getEmailTemplate);
};

export default emailRoutes;
