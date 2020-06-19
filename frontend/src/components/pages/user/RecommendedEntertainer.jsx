import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Humanize from 'humanize-plus';
import AlertMessage from 'components/common/utils/AlertMessage';
import { LANGUAGE, BUDGET, SELECT_ENTERTAINERS_TYPE } from 'utils/constants';
import Button from 'components/forms/Button';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getTokenFromStore } from 'utils/localStorage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { recommendEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { setInitialValues } from 'components/forms/form-helper';
import { feedback } from 'components/forms/form-helper';
import { getStates } from 'data/naija-states-and-lgas';

export const RecommendedEntertainer = ({ eventEntertainerId }) => (
  <BackEndPage title="Search Entertainer">
    <div className="main-app">
      <TopMessage message="Search Entertainer" />

      <section className="app-content">
        <RecommendedEntertainerForm />
      </section>
    </div>
  </BackEndPage>
);

RecommendedEntertainer.defaultProps = {
  eventEntertainerId: '0',
};

RecommendedEntertainer.propTypes = {
  eventEntertainerId: PropTypes.string,
};
export const RecommendedEntertainerForm = ({
  selectedSearchedEntertainer,
  location,
}) => {
  const [message, setMessage] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [languages, setLanguages] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [entertainers, setEntertainers] = React.useState([]);
  const noBudget = { label: 'None', value: '0' };
  const anyState = { label: 'Any', value: 'Any' };

  return (
    <div>
      <Formik
        initialValues={setInitialValues(recommendEntertainerSchema, {
          location,
        })}
        onSubmit={(
          { entertainerType, language, location, lowestBudget, highestBudget },
          actions
        ) => {
          setLoading(true);
          axios
            .get(`/api/v1/entertainers/recommend`, {
              headers: {
                'x-access-token': getTokenFromStore(),
              },
              params: {
                entertainerType,
                language: JSON.stringify(language),
                location,
                lowestBudget,
                highestBudget,
              },
            })
            .then(function (response) {
              const { status, data } = response;
              if (status === 200) {
                setEntertainers(data.entertainers);
                const noOfEntertainers = data.entertainers.length;
                if (noOfEntertainers > 0) {
                  setTitle(
                    `You have ${noOfEntertainers} ${Humanize.pluralize(
                      noOfEntertainers,
                      'recommended entertainer'
                    )}`
                  );
                  setLanguages(language);
                } else {
                  setTitle('No recommendation found');
                  setLanguages(null);
                }
              }
              setLoading(false);
            })
            .catch(function (error) {
              setMessage({
                message: error.response.data.message,
              });
              setLoading(false);
              setTitle(null);
            });
          actions.setSubmitting(false);
        }}
        render={({ isSubmitting, handleSubmit }) => (
          <Form className="card card-custom card-black card-form p-4">
            <AlertMessage {...message} />
            <>
              <div className="form-row">
                <Select
                  blankOption="Choose your preferred Entertainer Type"
                  formGroupClassName="col-md-6"
                  label="Entertainer Type"
                  name="entertainerType"
                  options={SELECT_ENTERTAINERS_TYPE}
                  placeholder="Entertainer Type"
                  showFeedback={feedback.ERROR}
                />
                <MultiSelect
                  formGroupClassName="col-md-6"
                  label="Language"
                  name="language"
                  optional
                  options={LANGUAGE}
                  placeholder="Preferred Language"
                  showFeedback={feedback.ERROR}
                />
              </div>
              <div className="form-row">
                <Select
                  formGroupClassName="col-md-6"
                  label="Lowest Budget (in Naira)"
                  name="lowestBudget"
                  optional
                  options={[noBudget, ...BUDGET]}
                  placeholder="Lowest Budget"
                  showFeedback={feedback.ERROR}
                />
                <Select
                  formGroupClassName="col-md-6"
                  label="Highest Budget (in Naira)"
                  name="highestBudget"
                  optional
                  options={[noBudget, ...BUDGET]}
                  placeholder="Highest Budget"
                  showFeedback={feedback.ERROR}
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Select State"
                  formGroupClassName="col-md-6"
                  label="Location"
                  name="location"
                  optional
                  options={[anyState, ...getStates()]}
                  placeholder="State"
                  showFeedback={feedback.ERROR}
                />
              </div>
              <div className="form-group">
                <Button
                  color="success"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Recommend Entertainer
                </Button>
              </div>
            </>
          </Form>
        )}
        validationSchema={createSchema(recommendEntertainerSchema)}
      />
      {loading ? (
        <LoadingScreen loading={loading} text="Loading Entertainers" />
      ) : (
        <EntertainersSearchResult
          entertainers={entertainers}
          selectedSearchedEntertainer={(entertainer) =>
            selectedSearchedEntertainer(entertainer, 'recommend', languages)
          }
          title={title}
        />
      )}
    </div>
  );
};

RecommendedEntertainerForm.defaultProps = {
  selectedSearchedEntertainer: () => {},
};

RecommendedEntertainerForm.propTypes = {
  location: PropTypes.string.isRequired,
  selectedSearchedEntertainer: PropTypes.func,
};

export default RecommendedEntertainer;
