import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import TopMessage from 'components/common/layout/TopMessage';
import AddEntertainerDetails from 'components/common/entertainers/AddEntertainerDetails';
import { getTokenFromStore } from 'utils/localStorage';
import { getLongDate, getTime } from 'utils/date-helpers';

const AddEntertainerToEvent = ({ id, type }) => {
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
          }
        })
        .catch(function(error) {
          console.log(error.response.data.message);
          // navigate to all events
        });
  }, [id]);

  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message="Add Entertainer" />

        <section className="app-content">
          <EventDetails event={event} />
          <AddEntertainerDetails eventId={id} />
          {/* Accordion, 1. select hire type, 2. Add Entertainer, 3. Review Details */}
        </section>
      </div>
    </BackEndPage>
  );
};

AddEntertainerToEvent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string
};

AddEntertainerToEvent.defaultProps = {
  id: null,
  type: null
};

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <>
      <h1>- {event.eventType}</h1>
      <div>{getLongDate(event.eventDate)}</div>
      <div>
        {getTime(event.startTime)} - {getTime(event.endTime)}{' '}
      </div>
    </>
  );
};
export default AddEntertainerToEvent;
