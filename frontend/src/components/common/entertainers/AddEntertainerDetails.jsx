import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  PLACE_OF_EVENTS,
  HIRE_ENTERTAINERS_TYPE
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TextArea from 'components/forms/TextArea';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState
} from 'components/forms/form-helper';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import AlertMessage from '../utils/AlertMessage';
import DatePicker from 'components/forms/DatePicker';
import BackEndPage from '../layout/BackEndPage';
import TopMessage from '../layout/TopMessage';
import { Row, Col } from 'reactstrap';
import Card from 'components/custom/Card';
import { getLongDate, getTime } from 'utils/date-helpers';
import { navigate } from '@reach/router';

const AddEntertainerDetails = ({ id }) => {
  const [event, setEvent] = React.useState({});
  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/events/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore()
          }
        })
        .then(function(response) {
          const { status, data } = response;
          console.log('status,data', status, data);
          // handle success
          if (status === 200) {
            setEvent(data.event);
            console.log('data.event: ', data.event);
          }
        })
        .catch(function(error) {
          console.log(error.response.data.message);
          // navigate to all events
        });
  }, [id]);
  return (
    <BackEndPage title="Add Entertainer">
      <div className="main-app">
        <TopMessage message={event.eventType || ''} />
        <EventDetails event={event} />

        <section className="app-content">
          <AddEntertainerToEvent event={event} id={id} type="Auction" />
        </section>
      </div>
    </BackEndPage>
  );
};

AddEntertainerDetails.propTypes = {
  id: PropTypes.string
};

AddEntertainerDetails.defaultProps = {
  id: null
};
const AddEntertainerToEvent = ({ event, id, type }) => {
  const { userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);
  const [hireType, setHireType] = React.useState(type);
  const handleTypeClick = selectedType => setHireType(selectedType);
  let initialValues = {
    lowestBudget: '50K',
    highestBudget: '1M+'
  };
  const isAuction =
    hireType.toLowerCase() ===
    HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase();

  if (isAuction) {
    initialValues = {
      ...initialValues,
      auctionStartDate: { date: event.createdAt || Date.now() },
      auctionEndDate: { date: event.eventDate || Date.now() }
    };
  }
  console.log('initialValues', initialValues);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(addEntertainerSchema, initialValues)}
      onSubmit={(values, actions) => {
        const entertainerDetails = {
          ...values,
          genre: JSON.stringify(values.genre),
          language: JSON.stringify(values.language),
          ageGroup: JSON.stringify(values.ageGroup),
          auctionStartDate: values.auctionStartDate.date,
          auctionEndDate: values.auctionEndDate.date,
          eventId: id,
          hireType
        };

        console.log('entertainerDetails: ', entertainerDetails);

        axios
          .post('/api/v1/eventEntertainer', entertainerDetails, {
            headers: { 'x-access-token': getTokenFromStore() }
          })
          .then(function(response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'add-entertainer-to-event',
                user: data
              });
              navigate('/user/events');
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <AlertMessage {...message} />
          <AddEntertainerDetailsForm
            onClick={handleTypeClick}
            type={hireType}
          />
          <div className="mt-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={handleSubmit}
              type="button"
            >
              Hire Entertainer
            </button>
          </div>
          <DisplayFormikState hide {...props} showAll />
        </>
      )}
      validationSchema={createSchema(addEntertainerSchema)}
    />
  );
};

AddEntertainerToEvent.propTypes = {
  event: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const AddEntertainerDetailsForm = ({ type, onClick }) => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Add Entertainer</h4>
      <HireEntertainersCardList onClick={onClick} type={type} />
      <div className="form-row">
        <Select
          blankOption="Choose your preferred Entertainer Type"
          formGroupClassName="col-md-6"
          label="Entertainer Type"
          name="entertainerType"
          options={SELECT_ENTERTAINERS_TYPE}
          placeholder="Entertainer Type"
        />
        <Select
          blankOption="Choose a place of event"
          formGroupClassName="col-md-6"
          label="Place of Event"
          name="placeOfEvent"
          options={PLACE_OF_EVENTS}
          placeholder="Place of Event"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Select an audience size"
          formGroupClassName="col-md-6"
          label="Expected Audience Size"
          name="expectedAudienceSize"
          options={AUDIENCE_SIZE}
          placeholder="Expected Audience Size"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          label="Age Group"
          name="ageGroup"
          options={EVENT_AGE_GROUP}
          placeholder="Select the event's age group"
        />
      </div>
      <div className="form-row">
        <MultiSelect
          formGroupClassName="col-md-6"
          label="Genre"
          name="genre"
          optional
          options={GENRE}
          placeholder="Genre"
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
      {type.toLowerCase() ===
        HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase() && (
        <div className="form-row">
          <DatePicker
            formGroupClassName="col-md-6"
            label="Auction Start Date"
            name="auctionStartDate"
            placeholderText="Event Date"
          />
          <DatePicker
            formGroupClassName="col-md-6"
            label="Auction End Date"
            name="auctionEndDate"
            placeholderText="Event Date"
          />
        </div>
      )}
      <div className="form-row">
        <Select
          blankOption="Choose your base budget"
          formGroupClassName="col-md-6"
          label="Base Budget (in Naira)"
          name="lowestBudget"
          options={BUDGET}
          placeholder="Lowest Budget"
        />
        <Select
          blankOption="Choose your highest budget"
          formGroupClassName="col-md-6"
          label="Highest Budget (in Naira)"
          name="highestBudget"
          options={BUDGET}
          placeholder="Highest Budget"
        />
      </div>
      <div className="form-row">
        <div className="col-md-12">
          <TextArea
            label="Special Requests"
            name="specialRequest"
            optional
            placeholder="E.g 10 special songs, your favorite song e.t.c."
            rows="3"
          />
        </div>
      </div>
    </div>
  </div>
);

AddEntertainerDetailsForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

AddEntertainerDetailsForm.defaultProps = {
  type: null
};
const HireEntertainersCardList = ({ type, onClick }) => (
  <Row className="row-eq-height mb-5">
    <label className="col-sm-12" htmlFor="">
      Select Hire Type
    </label>
    {Object.keys(HIRE_ENTERTAINERS_TYPE).map(hireType => (
      <HireEntertainersCard
        color={HIRE_ENTERTAINERS_TYPE[hireType].color}
        key={HIRE_ENTERTAINERS_TYPE[hireType].title}
        onClick={onClick}
        title={HIRE_ENTERTAINERS_TYPE[hireType].title}
        type={type}
      />
    ))}
  </Row>
);

HireEntertainersCardList.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

HireEntertainersCardList.defaultProps = {
  type: null
};

const HireEntertainersCard = ({ color, title, type, onClick }) => (
  <Col
    md={{ size: 4, offset: 0 }}
    onClick={() => onClick(title)}
    sm={{ size: 6, offset: 0 }}
  >
    <Card
      className={classNames('select-hire-type', {
        isActive: type && type.toLowerCase() === title.toLowerCase()
      })}
      color={color}
      hover
    >
      <h6 className="text-center mb-0">{title}</h6>
    </Card>
  </Col>
);

HireEntertainersCard.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string
};

HireEntertainersCard.defaultProps = {
  type: null
};

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <section>
      <small>
        {getLongDate(event.eventDate)} &nbsp;&nbsp;|&nbsp;&nbsp;
        {getTime(event.startTime)} - {getTime(event.endTime)}{' '}
      </small>
    </section>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    eventType: PropTypes.string,
    eventDate: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string
  })
};

export default AddEntertainerDetails;
