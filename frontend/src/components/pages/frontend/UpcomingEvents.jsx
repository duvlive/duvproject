import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row } from 'reactstrap';
import Events from 'components/common/events/Events';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import LoadingScreen from 'components/common/layout/LoadingScreen';

const UpcomingEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`/api/v1/public-events`).then(function (response) {
      const { status, data } = response;
      // handle success
      if (status === 200) {
        setEvents(data.result);
        setLoading(false);
      }
    });
  }, []);
  return (
    <FrontEndPage title="Upcoming Events">
      <UpcomingEventsSection events={events} loading={loading} />
    </FrontEndPage>
  );
};

const UpcomingEventsSection = ({ events, loading }) => (
  <section className="upcoming-events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        Upcoming <span>Events</span>
      </h2>
      {loading ? (
        <LoadingScreen loading={loading} text="Loading Entertainers" />
      ) : (
        <Row className="pt-5">
          <Events.List lists={events} />
        </Row>
      )}
    </div>
  </section>
);

UpcomingEventsSection.propTypes = {
  entertainers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UpcomingEvents;
