import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row } from 'reactstrap';
import Events from 'components/common/events/Events';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { Formik } from 'formik';
import Select from 'components/forms/Select';
import { getStates } from 'data/naija-states-and-lgas';
import DatePicker from 'components/forms/DatePicker';
import { getShortDate } from 'utils/date-helpers';

const UpcomingEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState({});
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/frontend/public-events`, { params: filters })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEvents(data.result);
          setLoading(false);
        }
      });
  }, [filters]);
  return (
    <FrontEndPage title="Upcoming Events">
      <UpcomingEventsSection
        events={events}
        filters={filters}
        loading={loading}
        setFilters={setFilters}
      />
    </FrontEndPage>
  );
};

const PublicEventFilter = ({ setFilters, filters }) => {
  const anyState = { label: 'Any', value: 'Any' };
  let currentFilter = null;
  if (filters && filters.startTime) {
    currentFilter = <span>Start Time: {getShortDate(filters.startTime)}</span>;
  }
  if (filters && filters.state) {
    currentFilter = <span>State: {filters.state}</span>;
  }
  return (
    <Formik
      initialValues={{ state: 'Any', startTime: '' }}
      onSubmit={(values, actions) => {
        const params = {};
        if (values.state !== 'Any') {
          params.state = values.state;
        }
        if (values.startTime.date) {
          params.startTime = values.startTime.date.toISOString();
        }
        console.log('values', params);
        setFilters(params);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <div className="form-row">
            <Select
              blankOption="Select State"
              formGroupClassName="col-md-4"
              label="State"
              name="state"
              optional
              options={[anyState, ...getStates()]}
            />
            <DatePicker
              formGroupClassName="col-md-4"
              label="Start Date"
              minDate={new Date()}
              name="startTime"
              optional
              placeholder="Start Date"
            />
            <div className="col-md-4">
              <label></label>
              <button
                className="btn btn-transparent btn-primary text-right btn-lg"
                onClick={handleSubmit}
                type="button"
              >
                Filter Event
              </button>
            </div>
            {Object.keys(filters).length > 0 && (
              <div className="mt-3">
                <span>Current Filters &nbsp; &nbsp;</span>
                {currentFilter}
              </div>
            )}
          </div>
        </>
      )}
    />
  );
};

PublicEventFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const UpcomingEventsSection = ({ events, loading, setFilters, filters }) => (
  <section className="upcoming-events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        Upcoming <span>Events</span>
      </h2>
      {loading ? (
        <LoadingScreen loading={loading} text="Loading Public Events" />
      ) : (
        <>
          <div className="mt-5">
            <PublicEventFilter
              events={events}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          <Row className="pt-5">
            <Events.List lists={events} />
          </Row>
        </>
      )}
    </div>
  </section>
);

UpcomingEventsSection.propTypes = {
  events: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default UpcomingEvents;
