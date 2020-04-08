import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Humanize from 'humanize-plus';
import AlertMessage from 'components/common/utils/AlertMessage';
import {
  GENRE,
  LANGUAGE,
  BUDGET,
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
} from 'utils/constants';
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
export const RecommendedEntertainerForm = ({ selectedSearchedEntertainer }) => {
  const [message, setMessage] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [entertainers, setEntertainers] = React.useState([]);

  return (
    <div>
      <Formik
        initialValues={setInitialValues(recommendEntertainerSchema, {
          lowestBudget: BUDGET[0].value,
          highestBudget: BUDGET[BUDGET.length - 2].value,
        })}
        onSubmit={({ stageName }, actions) => {
          setLoading(true);
          // post to api
          axios
            .get(`/api/v1/entertainers/recommend`, {
              headers: {
                'x-access-token': getTokenFromStore(),
              },
            })
            .then(function (response) {
              const { status, data } = response;
              if (status === 200) {
                setEntertainers(data.entertainers);
                const noOfEntertainers = data.entertainers.length;
                if (noOfEntertainers > 0) {
                  setTitle(
                    `${noOfEntertainers} ${Humanize.pluralize(
                      noOfEntertainers,
                      'entertainer'
                    )} found`
                  );
                } else {
                  setTitle(
                    `No entertainer with the Stage Name '${stageName}' found`
                  );
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
                />
                <MultiSelect
                  formGroupClassName="col-md-6"
                  label="Genre"
                  name="genre"
                  optional
                  options={GENRE}
                  placeholder="Genre"
                />
              </div>
              <div className="form-row">
                <Select
                  blankOption="Choose your lowest budget"
                  formGroupClassName="col-md-6"
                  label="Lowest Budget (in Naira)"
                  name="lowestBudget"
                  optional
                  options={BUDGET}
                  placeholder="Lowest Budget"
                />
                <Select
                  blankOption="Choose your highest budget"
                  formGroupClassName="col-md-6"
                  label="Highest Budget (in Naira)"
                  name="highestBudget"
                  optional
                  options={BUDGET}
                  placeholder="Highest Budget"
                />
              </div>
              <div className="form-row">
                <MultiSelect
                  formGroupClassName="col-md-6"
                  label="Age Group"
                  name="ageGroup"
                  options={EVENT_AGE_GROUP}
                  placeholder="Select the event's age group"
                />
                <MultiSelect
                  formGroupClassName="col-md-6"
                  label="Language"
                  name="language"
                  optional
                  options={LANGUAGE}
                  placeholder="Preferred Language"
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
            selectedSearchedEntertainer(entertainer, 'recommend')
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
  selectedSearchedEntertainer: PropTypes.func,
};

export default RecommendedEntertainer;
