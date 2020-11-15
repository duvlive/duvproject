import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import NoContent from 'components/common/utils/NoContent';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import { Link } from '@reach/router';
import Events from 'components/common/events/Events';

const OtherPublicEvents = () => {
  const [publicEvents, setPublicEvents] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/public-events/others', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setPublicEvents(data.result);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setPublicEvents([]);
      });
  }, []);
  return (
    <BackEndPage title="PublicEvents">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          <div className="text-right">
            <Link
              className="btn btn-danger mb-3 btn-transparent btn-wide"
              to="/user/public-events/new"
            >
              <span className="icon icon-events"></span> New Public Event
            </Link>
          </div>
          <h4 className="mb-3">Upcoming Public Events</h4>
          <LoadItems
            items={publicEvents}
            loadingText="Loading your PublicEvents"
            noContent={
              <NoContent isButton text="No Upcoming Public Events found" />
            }
          >
            <PublicEventsRowList publicEvents={publicEvents || []} />
          </LoadItems>
          <Link
            className="btn btn-success mb-3 btn-transparent btn-wide"
            to="/user/public-events"
          >
            <span className="icon icon-events"></span> Back to Your Public
            Events
          </Link>
        </section>
      </div>
    </BackEndPage>
  );
};

const PublicEventsRowList = ({ publicEvents }) => (
  <div className="row text-center">
    {publicEvents.map((publicEvent, index) => (
      <Events key={index} {...publicEvent} isDashboard />
    ))}
  </div>
);

PublicEventsRowList.propTypes = {
  publicEvents: PropTypes.array.isRequired,
};

export default OtherPublicEvents;
