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
// import DatePicker from './DatePicker';
import AutoComplete from 'components/forms/AutoComplete';
import { DisplayFormikState, feedback } from './form-helper';

// import { Formik, Form } from 'formik';
// import Input from 'components/forms/Input';
// import { feedback } from 'components/forms/form-helper';
// import Button from 'components/forms/Button';
// import { registerSchema } from 'components/forms/schema/userSchema';

// const Register.Form = () => (
//   <Formik
//   initialValues={{
//     email: 'harunpopson@yahoo.com',
//     password: '123456'
//   }}
//   onSubmit={(values, actions) => {
//     setTimeout(() => {
//       actions.setSubmitting(false);
//     }, 400);
//   }}
//   render={({ isSubmitting, handleSubmit }) => (
//     <Form>
//       <div className="form-row">
//         <Input
//           formGroupClassName="col-md-6"
//           label="First Name"
//           name="firstName"
//           placeholder="First Name"
//         />
//         <Input
//           formGroupClassName="col-md-6"
//           label="Last Name"
//           name="lastName"
//           placeholder="Last Name"
//         />
//       </div>
//       <Input
//         label="Password"
//         name="password"
//         placeholder="Password"
//         type="password"
//       />
//       <Button
//         className="btn-danger btn-wide btn-transparent"
//         loading={isSubmitting}
//         onClick={handleSubmit}
//       >
//         Register
//       </Button>
//     </Form>
//   )}
//   validationSchema={registerSchema}
// />
// );

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
                      showFeedback={feedback.ALL}
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
                        <AutoComplete
                          name="autocomplete"
                          suggestions={[
                            { id: 3, name: 'Bananas' },
                            { id: 4, name: 'Mangos' },
                            { id: 5, name: 'Lemons' },
                            { id: 6, name: 'Apricots', disabled: true }
                          ]}
                          value={[
                            { id: 1, name: 'Apples' },
                            { id: 2, name: 'Pears' }
                          ]}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <Switch label={'I agree'} name="agree" value={false} />
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Event Date</label>
                        <DatePicker
                          name="event-date"
                          placeholderText="Event Date"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Start Time</label>
                        <DatePicker
                          dateFormat="h:mm aa"
                          name="event-time"
                          showTimeSelect
                          showTimeSelectOnly
                          timeCaption="Start Time"
                          timeIntervals={30}
                        />
                      </div>
                    </div> */}

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-primary text-uppercase"
                        // disabled={props.isSubmitting}
                        // onClick={props.handleSubmit}
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
