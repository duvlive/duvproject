import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import Input from 'components/forms/Input';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import RadioSelect from './RadioSelect';
import CheckboxGroup from './CheckboxGroup';
import Select from './Select';
import Switch from './Switch';
import DatePicker from './DatePicker';

export const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <pre
      style={{
        color: '#aaa',
        fontSize: '.65rem',
        border: '1px solid #666',
        marginTop: '5rem',
        padding: '1.5rem 2rem'
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const FormikForm = () => {
  const [result, setResult] = React.useState(null);
  return (
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
                    setResult(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 400);
                }}
                render={props => (
                  <Form>
                    <h4 className="mb-4">Log into your Account</h4>
                    <div className="">{result}</div>
                    <Input
                      helpText="Help is on the way"
                      isValidMessage="Name looks good"
                      label="Emaill"
                      name="email"
                      placeholder="Email Address"
                      showFeedback={false}
                      tooltipText="Your email address"
                      type="email"
                    />
                    <Input
                      isValidMessage="Sweet, the password is strong"
                      label="Password"
                      name="password"
                      placeholder="Password"
                      showFeedback
                      tooltipText="Your password"
                      type="password"
                    />

                    <div className="row">
                      <div className="col-12">
                        <RadioSelect
                          inline
                          name="sex"
                          options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' }
                          ]}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <RadioSelect
                          inline
                          label="Preference"
                          name="preference"
                          options={[{ label: 'Rice' }, { value: 'beans' }]}
                          // options can contain either value or label
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <CheckboxGroup
                          inline
                          label="Preference"
                          name="pref"
                          options={[
                            { label: 'Receive Newsletter' },
                            { value: 'Love Newsletter' }
                          ]}
                          // options can contain either value or label
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <Select
                          blankOption="Select Options"
                          label="Preference"
                          name="prefs"
                          options={[
                            { label: 'Receive Newsletter' },
                            { value: 'Love Newsletter' }
                          ]}
                          // options can contain either value or label
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <Switch label={'I agree'} name="agree" value={false} />
                      </div>
                    </div>

                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">Event Date</label>
                      <DatePicker
                        className="form-control"
                        name="event-date"
                        placeholderText="Event Date"
                      />
                    </div>

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-primary text-uppercase"
                        disabled={props.isSubmitting}
                        onClick={props.handleSubmit}
                        type="button"
                      >
                        Sign In
                      </button>
                      {/* <Link className="btn btn-primary" to="dashboard">
                      {' '}
                      Sign In{' '}
                    </Link> */}
                    </div>

                    <DisplayFormikState {...props} />
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
                    .required(),
                  sex: yup.string().required()
                })}
              />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

export default FormikForm;
