import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import { remainingDays, getShortDate } from 'utils/date-helpers';
import Image from 'components/common/utils/Image';
import Card from 'components/custom/Card';
import DuvLiveModal from 'components/custom/Modal';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';

const ViewEvent = ({ id }) => {
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
  const entertainersDetails =
    (event &&
      event.entertainers &&
      event.entertainers.map(({ entertainer }) => entertainer)) ||
    [];

  const stageNames =
    (entertainersDetails &&
      entertainersDetails.map(
        entertainer => entertainer && entertainer.stageName
      )) ||
    [];

  return (
    <BackEndPage title="View Event">
      <div className="main-app">
        <TopMessage message="View Event" />

        <section className="app-content">
          <div className="row">
            <div className="col-sm-6">
              <Card color="blue" title={event.eventType}>
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <td className="text-red-100">Entertainer</td>
                      <td className="text-right">{stageNames.join(', ')}</td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Event Date</td>
                      <td className="text-right">
                        {getShortDate(event.eventDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Location</td>
                      <td className="text-right">{event.city}</td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Remaining Days</td>
                      <td className="text-right">
                        {remainingDays(event.eventDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Address</td>
                      <td className="text-right">
                        <address className="text-muted">
                          {event.streetLine1} <br />
                          {event.streetLine2}, {event.lga} <br />
                          {event.landmark}, {event.location}
                        </address>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
            <div className="col-sm-6">
              <ViewEvent.EntertainersTable
                entertainers={event.entertainers || []}
              />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewEvent.propTypes = {
  id: PropTypes.string
};

ViewEvent.defaultProps = {
  id: null
};

ViewEvent.EntertainersTable = ({ entertainers }) => (
  <Card color="black">
    <h5 className="sub-title text-muted blue">Hired Entertainers</h5>
    <div className="table-responsive">
      <table className="table table-dark">
        <tbody>
          {entertainers.map(entertainer => (
            <ViewEvent.EntertainersRow
              entertainer={entertainer.entertainer}
              key={
                entertainer.entertainer.stageName + entertainer.entertainer.id
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

ViewEvent.EntertainersTable.propTypes = {
  entertainers: PropTypes.array.isRequired
};

ViewEvent.EntertainersRow = ({ entertainer }) => {
  console.log('entertainer', entertainer.personalDetails.profileImageURL);
  return (
    <tr>
      <td className="align-middle">
        <Image
          className="avatar--medium"
          name={(entertainer && entertainer.stageName) || 'No name'}
          responsiveImage={false}
          src={
            (entertainer &&
              entertainer.personalDetails &&
              entertainer.personalDetails.profileImageURL) ||
            'No src'
          }
        />
      </td>
      <td className="align-middle">{entertainer && entertainer.stageName}</td>
      <td className="align-middle text-yellow">
        {entertainer && entertainer.entertainerType}
      </td>
      <td className="align-middle">
        {entertainer && (
          <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
        )}
      </td>
    </tr>
  );
};
ViewEvent.EntertainersRow.propTypes = {
  entertainer: PropTypes.object.isRequired
};

export default ViewEvent;
