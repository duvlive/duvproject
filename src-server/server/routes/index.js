import applicationRoutes from './applicationRoute';
import approveCommentRoutes from './approveCommentRoutes';
import bankDetailsRoutes from './bankDetailRoutes';
import commissionRoutes from './commissionRoute';
import contactRoutes from './contactRoutes';
import emailRoutes from './emailRoutes';
import entertainerRoutes from './entertainerRoutes';
import eventEntertainerRoutes from './eventEntertainerRoute';
import eventRoutes from './eventRoutes';
import galleryRoutes from './galleryRoutes';
import identificationRoutes from './identificationRoutes';
import imageRoutes from './imageRoutes';
import otherRoutes from './otherRoutes';
import paymentRoutes from './paymentRoute';
import userRoutes from './userRoutes';
import videoRoutes from './videoRoutes';
import welcomeRoute from './welcomeRoute';

const routes = app => {
  applicationRoutes(app);
  approveCommentRoutes(app);
  bankDetailsRoutes(app);
  commissionRoutes(app);
  contactRoutes(app);
  emailRoutes(app);
  entertainerRoutes(app);
  eventEntertainerRoutes(app);
  eventRoutes(app);
  galleryRoutes(app);
  identificationRoutes(app);
  imageRoutes(app);
  otherRoutes(app);
  paymentRoutes(app);
  userRoutes(app);
  videoRoutes(app);
  welcomeRoute(app);
};

export default routes;
