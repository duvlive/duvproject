import { RatingController, CronController } from '../controllers';

const cronRoutes = (router) => {
  // get all cron notifications
  router.get('/api/v1/cron/notifications', CronController.getCrons);

  // processed crons
  router.get(
    '/api/v1/cron/process-unrated-events',
    RatingController.processUnratedEvents
  );
};

export default cronRoutes;
