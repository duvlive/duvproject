import React from 'react';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import axios from 'axios';
import { Col, Row, Form } from 'reactstrap';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import AlertMessage from 'components/common/utils/AlertMessage';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import { contactUsSchema } from 'components/forms/schema/frontPageSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { Link } from '@reach/router';
import { OUR_PHONE_NUMBER } from 'utils/constants';
import Button from 'components/forms/Button';

const ContactUs = () => {
  return (
    <div className="contactus-section">
      <FrontEndPage title="Contact Us">
        <div className="container-fluid spacer">
          <Row>
            <Col sm={12}>
              <h2 className="header title-border mb-4">
                CONTACT <span>US</span>
              </h2>
              <p>
                Fill out the form below and your request will be routed to the
                appropriate team.
              </p>
            </Col>
            <Col md={7} sm={12}>
              <ContactUsForm />
            </Col>
            <Col md={{ size: 4, offset: 1 }} sm={12}>
              <ContactUsInfo />
            </Col>
          </Row>
        </div>
      </FrontEndPage>
    </div>
  );
};

export const ContactUsForm = () => {
  const [message, setMessage] = React.useState(null);
  return (
    <Formik
      initialValues={setInitialValues(contactUsSchema)}
      onSubmit={(values, actions) => {
        axios
          .post('/api/v1/contactUs', values)
          .then(function (response) {
            const { data, status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: data.message,
              });
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({
              message: error.response.data.message,
              lists:
                error.response.data.errors &&
                Object.values(error.response.data.errors),
            });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <AlertMessage {...message} />
          <Input label="Full Name" name="fullName" placeholder="Full Name" />
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Email"
              name="userEmail"
              placeholder="Email Address"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Phone"
              name="phone"
              optional
              placeholder="Phone"
            />
          </div>
          <Input label="Subject" name="userSubject" placeholder="Subject" />
          <TextArea
            label="Message"
            name="userMessage"
            placeholder="Your message"
            rows="6"
          />
          <DisplayFormikState {...props} hide showAll />
          <div className="form-row">
            <Button
              className="btn-danger btn-wide btn-transparent"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Contact Us
            </Button>
          </div>
        </Form>
      )}
      validationSchema={createSchema(contactUsSchema)}
    />
  );
};

export const ContactUsInfo = () => (
  <>
    <h4 className="text-muted font-weight-normal mb-3">GENERAL ENQUIRIES</h4>
    <h2 className="text-white title font-weight-normal mb-2">
      {OUR_PHONE_NUMBER}
    </h2>
    <a href="mailto:info@duvlive.com">info@duvlive.com</a>
    <p className="mt-4">
      DUV LIVE is an online platform that supports and promotes the best in live
      entertainment. Our range of services affords talented performers the power
      to manage their bookings personally, while delivering world class exposure
      to all levels of live entertainment. Simply hire the entertainer of your
      choice for that upcoming party by following these simple steps:
      <Link className="d-block mt-3" to="/how-it-works">
        Learn more &rarr;
      </Link>
    </p>
  </>
);

export default ContactUs;
