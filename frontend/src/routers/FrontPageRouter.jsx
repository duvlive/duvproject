import React from 'react';
import { Router } from '@reach/router';
import Home from 'components/pages/frontend/Home';
import HowItWorks from 'components/pages/frontend/HowItWorks';
import UpcomingEvents from 'components/pages/frontend/UpcomingEvents';
import HireEntertainers from 'components/pages/frontend/HireEntertainers';
import Help from 'components/pages/frontend/Help';
import TermsOfUse from 'components/pages/frontend/TermsOfUse';
import PrivacyPolicy from 'components/pages/frontend/PrivacyPolicy';
import Login from 'components/pages/auth/Login';
import Logout from 'components/pages/auth/Logout';
import Register from 'components/pages/auth/Register';
import SingleEntertainer from 'components/pages/frontend/SingleEntertainer';
import SingleEvent from 'components/pages/frontend/SingleEvent';
import ForgotPassword from 'components/pages/auth/ForgotPassword';
import ResetPassword from 'components/pages/auth/ResetPassword';
import ContactUs from 'components/pages/frontend/ContactUs';
import ProcessPayments from 'components/pages/frontend/ProcessPayments';
import CompleteRegistration from 'components/pages/auth/CompleteRegistration';
import NewBandMemberRegistration from 'components/pages/auth/NewBandMemberRegistration';
import ProcessExistingUserAsBandMember from 'components/pages/auth/ProcessExistingUserAsBandMember';

const FrontPageRouter = () => (
  <Router>
    <Home path="/" />
    <HowItWorks path="how-it-works" />
    <UpcomingEvents path="upcoming-events" />
    <SingleEntertainer path="entertainers/profile/:slug" />
    <HireEntertainers path="entertainers" />
    <HireEntertainers path="entertainers/:type" />
    <Help path="help" />
    <ContactUs path="contact-us" />
    <TermsOfUse path="terms-of-use" />
    <PrivacyPolicy path="privacy-policy" />
    <Login path="login" />
    <Login path="login/:sid" />
    <Login path="activate/:token" />
    <Logout path="logout" />
    <ForgotPassword path="forgot-password" />
    <ResetPassword path="reset-password/:token" />
    <Register path="register" />
    <Register path="register/:type" />
    <SingleEvent path="event/:slug" />
    <CompleteRegistration path="complete-registration/:sid" />
    <ProcessPayments path="/payment" />
    <NewBandMemberRegistration path="activate/new/band-member/:bandToken" />
    <ProcessExistingUserAsBandMember path="activate/existing/band-member/:bandToken" />
  </Router>
);

export default FrontPageRouter;
