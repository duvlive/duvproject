import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import Input from 'components/forms/Input';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const FormikForm = () => (
  <BackEndPage title="Formik Form">
    <div className="main-app">
      <TopMessage message="Formik Form" />

      <section className="app-content">
        <div className="card card-custom card-black card-form">
          <div className="card-body col-md-10">
            <h4 className="card-title green">Form Testing </h4>

            <Formik
              initialValues={{
                email: 'harunpopson@yahoo.com',
                password: '123456'
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 400);
              }}
              render={({ isSubmitting, handleSubmit }) => (
                <Form>
                  <h4 className="mb-4">Log into your Account</h4>
                  <Input
                    helpText="Help is on the way"
                    isValidMessage="Name looks good"
                    label="Emaill"
                    name="email"
                    placeholder="Email Address"
                    showFeedback={false}
                    tooltip="Your email address"
                    type="email"
                  />
                  <Input
                    isValidMessage="Sweet, the password is strong"
                    label="Password"
                    name="password"
                    placeholder="Password"
                    showFeedback
                    tooltip="Your password"
                    type="password"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    {/* <Button
              color="primary"
              className="text-uppercase"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Sign In
            </Button> */}
                    {/* <Link className="btn btn-primary" to="dashboard">
                      {' '}
                      Sign In{' '}
                    </Link> */}
                  </div>
                  {/*
          <div className="row">
            <div className="col-12">
              <RadioSelect
                name="sex"
                label="sex"
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]}
              />
            </div>
          </div> */}
                </Form>
              )}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email()
                  .required(),
                password: yup
                  .string()
                  .min(6)
                  .required()
              })}
            />
          </div>
        </div>
      </section>
    </div>
  </BackEndPage>
);

export default FormikForm;
