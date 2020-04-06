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

export const SearchEntertainer = ({ eventEntertainerId }) => (
  <BackEndPage title="Search Entertainer">
    <div className="main-app">
      <TopMessage message="Search Entertainer" />

      <section className="app-content">
        <SearchEntertainerForm eventEntertainerId={eventEntertainerId} />
      </section>
    </div>
  </BackEndPage>
);

SearchEntertainer.defaultProps = {
  eventEntertainerId: '0',
};

SearchEntertainer.propTypes = {
  eventEntertainerId: PropTypes.string,
};

export const SearchEntertainerForm = ({ eventEntertainerId }) => {
  const [message, setMessage] = React.useState(null);
  const [isSearchForm, setIsSearchForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [entertainers, setEntertainers] = React.useState([]);

  // React.useEffect(() => {
  //   eventEntertainerId &&
  //     axios
  //       .get(`/api/v1/entertainers/search/pastEvents/${eventEntertainerId}`, {
  //         headers: {
  //           'x-access-token': getTokenFromStore(),
  //         },
  //       })
  //       .then(function (response) {
  //         const { status, data } = response;
  //         // handle success
  //         if (status === 200) {
  //           setEntertainers(data.entertainers);
  //           console.log(data.entertainers);
  //           setLoading(false);
  //         }
  //       });
  // }, [eventEntertainerId]);

  return (
    <div>
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
            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                label="Stage Name"
                name="stageName"
                placeholder="Stage Name"
                showFeedback={feedback.NONE}
              />
              <div className="form-group col-md-3">
                <label htmlFor="search"></label>
                <Button
                  loading={isSubmitting}
                  name="search"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </div>
            </div>
          </Form>
        )}
        validationSchema={createSchema({
          stageName: stringValidation('Stage Name', 2),
        })}
      />
      {loading ? (
        <LoadingScreen loading={loading} text="Loading Entertainers" />
      ) : (
        <EntertainersSearchResult
          entertainers={entertainers}
          isSearchForm={isSearchForm}
        />
      )}
    </div>
  );
};

SearchEntertainerForm.defaultProps = {
  eventEntertainerId: '0',
};

SearchEntertainerForm.propTypes = {
  eventEntertainerId: PropTypes.string,
};

export default SearchEntertainer;
