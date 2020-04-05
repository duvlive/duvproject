import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import axios from 'axios';
import Button from 'components/forms/Button';
import AlertMessage from 'components/common/utils/AlertMessage';
import { feedback } from 'components/forms/form-helper';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getTokenFromStore } from 'utils/localStorage';
import {
  createSchema,
  stringValidation,
} from 'components/forms/schema/schema-helpers';

const SearchEntertainer = ({ eventEntertainerId }) => {
  const [message, setMessage] = React.useState(null);
  const [isSearchForm, setIsSearchForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [entertainers, setEntertainers] = React.useState([]);

  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/entertainers/search/pastEvents/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEntertainers(data.entertainers);
            console.log(data.entertainers);
            setLoading(false);
          }
        });
  }, [eventEntertainerId]);

  return (
    <BackEndPage title="Search Entertainer">
      <div className="main-app">
        <TopMessage message="Search Entertainer" />

        <section className="app-content">
          <div className="row">
            {' '}
            <div className="col-sm-3">
              <Formik
                initialValues={{
                  stageName: '',
                }}
                onSubmit={({ stageName }, actions) => {
                  setLoading(true);
                  // post to api
                  axios
                    .get(`/api/v1/entertainers/search?name=${stageName}`, {
                      headers: {
                        'x-access-token': getTokenFromStore(),
                      },
                    })
                    .then(function (response) {
                      const { status, data } = response;
                      if (status === 200) {
                        console.log('data', data);
                        setEntertainers(data.entertainers);
                        setIsSearchForm(true);
                      }
                      setLoading(false);
                    })
                    .catch(function (error) {
                      setMessage({
                        message: error.response.data.message,
                      });
                      setLoading(false);
                    });
                  actions.setSubmitting(false);
                }}
                render={({ isSubmitting, handleSubmit }) => (
                  <Form className="card card-custom card-black card-form ">
                    <AlertMessage {...message} />
                    <Input
                      label="Stage Name"
                      name="stageName"
                      placeholder="Stage Name"
                      showFeedback={feedback.NONE}
                    />
                    <Button loading={isSubmitting} onClick={handleSubmit}>
                      Search
                    </Button>
                  </Form>
                )}
                validationSchema={createSchema({
                  stageName: stringValidation('Stage Name', 2),
                })}
              />
            </div>
            {loading ? (
              <LoadingScreen loading={loading} text="Loading Entertainers" />
            ) : (
              <EntertainersSearchResult
                entertainers={entertainers}
                isSearchForm={isSearchForm}
              />
            )}
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

SearchEntertainer.defaultProps = {
  eventEntertainerId: '0',
};

SearchEntertainer.propTypes = {
  eventEntertainerId: PropTypes.string.isRequired,
};

export default SearchEntertainer;
