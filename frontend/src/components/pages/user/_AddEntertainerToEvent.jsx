import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddEntertainerDetails from 'components/pages/user/AddEntertainerToEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { getLongDate, getTime } from 'utils/date-helpers';
import HireEntertainers from './_HireEntertainers';
import Card from 'components/custom/Card';
import StepperPage from 'components/common/layout/StepperPage';
// import { HIRE_ENTERTAINERS_TYPE } from 'utils/constants';
// import { UserContext } from 'context/UserContext';

const AddEntertainerToEvent = ({ id, type }) => {
  const [event, setEvent] = React.useState({});
  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/events/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          console.log('status,data', status, data);
          // handle success
          if (status === 200) {
            setEvent(data.event);
            console.log('data.event: ', data.event);
          }
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          // navigate to all events
        });
  }, [id]);

  const ALL_STEPS = [
    null,
    <HireEntertainersStep />,
    <AddEntertainerDetails eventId={id} />,
    <EventDetails event={event} />,
  ];

  return (
    // initialstep to change to 2 later
    <StepperPage
      allSteps={ALL_STEPS}
      doneStatus={[true, false, false]}
      initialStep={1} // maybe use this to move to other steps
      pageSteps={ADD_ENTERTAINER_STEPS}
      title="Add Entertainer"
    />
  );
};

AddEntertainerToEvent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

AddEntertainerToEvent.defaultProps = {
  id: null,
  type: null,
};

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <section>
      <h6>{event.eventType}</h6>
      <div>Date - {getLongDate(event.eventDate)}</div>
      <div>
        Time -{getTime(event.startTime)} - {event.eventDuration}{' '}
      </div>
    </section>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    eventType: PropTypes.string,
    eventDate: PropTypes.string,
    startTime: PropTypes.string,
    eventDuration: PropTypes.string,
  }),
};

const ADD_ENTERTAINER_STEPS = {
  hireType: { title: 'Select Hire Type' },
  addEntertainer: { title: 'Add Entertainer' },
  review: { title: 'Review' },
};

const HireEntertainersStep = () => (
  <Card className="col-12" title="Hire Entertainer">
    <HireEntertainers.Cards />
  </Card>
);
export default AddEntertainerToEvent;
