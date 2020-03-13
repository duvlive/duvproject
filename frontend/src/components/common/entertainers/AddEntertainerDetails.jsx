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
import {
  getLongDate,
  getTime,
  subtractDays,
  getTimeOfDay
} from 'utils/date-helpers';
import { navigate, Match } from '@reach/router';
import { addDays } from 'date-fns';

const AddEntertainerDetails = ({ id }) => {
  let auctionIsDisabled = false;
  let type = 'Auction';
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

  if (event && Date.now() > subtractDays(event.eventDate, 4)) {
    auctionIsDisabled = true;
    type = 'Recommend';
  }
  const eventIsTooClose =
    event && Date.now() >= subtractDays(event.eventDate, 3);

  return (
    <BackEndPage title="Add Entertainer">
      <div className="main-app">
        <TopMessage message={event.eventType || ''} />
        <EventDetails event={event} />

        {eventIsTooClose ? (
          <NoEntertainer />
        ) : (
          <section className="app-content">
            <Match path="/user/events/:id/add-entertainer/new-event">
              {props =>
                // eslint-disable-next-line react/prop-types
                props.match && (
                  <AlertMessage
                    message="Your Event has been successfully saved."
                    type="success"
                  />
                )
              }
            </Match>
            <AddEntertainerToEvent
              auctionIsDisabled={auctionIsDisabled}
              event={event}
              id={id}
              type={type}
            />
          </section>
        )}
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
const AddEntertainerToEvent = ({ auctionIsDisabled, event, id, type }) => {
  const { userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);
  const [hireType, setHireType] = React.useState(type);
  const handleTypeClick = selectedType => setHireType(selectedType);
  let initialValues = {
    lowestBudget: BUDGET[0].value,
    highestBudget: BUDGET[10].value
  };
  const isAuction =
    hireType.toLowerCase() ===
    HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase();

  if (isAuction) {
    initialValues = {
      ...initialValues,
      auctionStartDate: { date: Date.now() },
      auctionEndDate: {
        date: subtractDays(event.eventDate, 4) || Date.now()
      }
    };
  }
  console.log('Date.now() ', Date.now());
  console.log('event.eventDate', event.eventDate);
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
              navigate(`/user/events/view/${id}`);
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
            auctionIsDisabled={auctionIsDisabled}
            eventDate={event.eventDate}
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
  auctionIsDisabled: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const AddEntertainerDetailsForm = ({
  auctionIsDisabled,
  eventDate,
  type,
  onClick
}) => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Add Entertainer</h4>
      <HireEntertainersCardList
        auctionIsDisabled={auctionIsDisabled}
        onClick={onClick}
        type={type}
      />
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
        HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase() &&
        !auctionIsDisabled && (
          <div className="form-row">
            <DatePicker
              formGroupClassName="col-md-6"
              label="Auction Start Date"
              maxDate={subtractDays(eventDate, 5)}
              minDate={new Date()}
              name="auctionStartDate"
              placeholderText="Event Date"
            />
            <DatePicker
              formGroupClassName="col-md-6"
              label="Auction End Date"
              maxDate={subtractDays(eventDate, 4)}
              minDate={addDays(new Date(), 1)}
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
  auctionIsDisabled: PropTypes.bool.isRequired,
  eventDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

AddEntertainerDetailsForm.defaultProps = {
  type: null
};
const HireEntertainersCardList = ({ auctionIsDisabled, type, onClick }) => {
  return (
    <Row className="row-eq-height mb-5">
      <label className="col-sm-12" htmlFor="">
        Select Hire Type
      </label>
      {Object.keys(HIRE_ENTERTAINERS_TYPE).map(hireType => {
        const title = HIRE_ENTERTAINERS_TYPE[hireType].title;
        const isActive = type && type.toLowerCase() === title.toLowerCase();
        return (
          <HireEntertainersCard
            color={HIRE_ENTERTAINERS_TYPE[hireType].color}
            isActive={isActive}
            key={title}
            onClick={onClick}
            title={title}
          />
        );
      })}
      <div className="col-12">
        <div className="text-muted">
          {HIRE_ENTERTAINERS_TYPE[type.toLowerCase()].description}
        </div>

        {auctionIsDisabled}
      </div>
    </Row>
  );
};

HireEntertainersCardList.propTypes = {
  auctionIsDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

HireEntertainersCardList.defaultProps = {
  type: null
};

const HireEntertainersCard = ({ color, title, isActive, onClick }) => {
  return (
    <Col
      md={{ size: 4, offset: 0 }}
      onClick={() => onClick(title)}
      sm={{ size: 6, offset: 0 }}
    >
      <Card
        className={classNames('select-hire-type', {
          isActive: isActive
        })}
        color={color}
        hover
      >
        <h6 className="text-center mb-0">
          {/* {isActive && <span className="icon icon-ok text-white" />} */}
          {title}
        </h6>
      </Card>
    </Col>
  );
};

HireEntertainersCard.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <section>
      <small>
        {getLongDate(event.eventDate)} &nbsp;&nbsp;|&nbsp;&nbsp;
        {getTime(event.startTime)} in the {getTimeOfDay(event.startTime)} -{' '}
        {event.eventDuration}{' '}
      </small>
    </section>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    eventType: PropTypes.string,
    eventDate: PropTypes.string,
    startTime: PropTypes.string,
    eventDuration: PropTypes.string
  })
};

const NoEntertainer = () => (
  <section className="app-content">
    <AlertMessage message="No enough time to plan for event" type="error" />
    <h4 className="text-blue font-weight-normal mt-4">
      You cannot add any Entertainer to Events less than 3 days
    </h4>
  </section>
);
export default AddEntertainerDetails;
