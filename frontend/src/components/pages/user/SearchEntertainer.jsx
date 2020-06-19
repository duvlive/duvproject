import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import axios from 'axios';
import Humanize from 'humanize-plus';
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

export const SearchEntertainerForm = ({ selectedSearchedEntertainer }) => {
  const [message, setMessage] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [entertainers, setEntertainers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(null);

  return (
    <div>
      <Formik
        initialValues={{
          stageName: '',
        }}
        onSubmit={({ stageName }, actions) => {
          setLoading(true);
          setSearchTerm(stageName);
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
                  color="info"
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
          searchTerm={searchTerm}
          selectedSearchedEntertainer={(entertainer) =>
            selectedSearchedEntertainer(entertainer, 'search')
          }
          title={title}
        />
      )}
    </div>
  );
};

SearchEntertainerForm.defaultProps = {
  selectedSearchedEntertainer: () => {},
};

SearchEntertainerForm.propTypes = {
  selectedSearchedEntertainer: PropTypes.func,
};

export default SearchEntertainer;
