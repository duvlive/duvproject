import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { Match } from '@reach/router';
import { twoDigitNumber } from 'utils/helpers';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { getShortDate } from 'utils/date-helpers';
import { moneyFormat } from 'utils/helpers';
import NoContent from 'components/common/utils/NoContent';
import Image from 'components/common/utils/Image';

const Requests = () => {
  const [requests, setRequests] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/api/v1/user/requests', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setRequests(data.requests);
          console.log('Requests: ', data.requests);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);
  console.log('requests', requests);
  return (
    <BackEndPage title="Requests">
      <div className="main-app">
        <TopMessage message="Requests" />

        <section className="app-content">
          <Match path="/user/requests/status/error">
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match && (
                <AlertMessage
                  message="The selected request cannot be found or has already been approved."
                  type="error"
                />
              )
            }
          </Match>
          {requests.length > 0 ? (
            <RequestsTable requests={requests} />
          ) : (
            <NoContent
              isButton
              linkText="Add a New Event"
              linkTo="/user/events/new"
              text={
                <>
                  No Request Found.
                  <div className="small  mt-3">
                    You can create a new Request after adding a new Event
                  </div>
                </>
              }
            />
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

const RequestsTable = ({ requests }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {requests.map((request, index) => (
          <RequestsRow
            askingPrice={request.askingPrice}
            entertainerId={request.user.profile.id}
            entertainerType={request.eventEntertainerInfo.entertainerType}
            eventDate={request.event.eventDate}
            eventType={request.event.eventType}
            expiryDate={request.expiryDate}
            hireType={request.eventEntertainerInfo.hireType}
            key={index}
            number={index + 1}
            profileImageURL={request.user.profileImageURL}
            slug={request.user.profile.slug}
            stageName={request.user.profile.stageName}
            status={request.status}
          />
        ))}
      </tbody>
    </table>
  </div>
);

RequestsTable.propTypes = {
  requests: PropTypes.array.isRequired,
};

const RequestsRow = ({
  askingPrice,
  entertainerType,
  eventDate,
  eventType,
  number,
  profileImageURL,
  slug,
  stageName,
  status,
}) => (
  <tr>
    <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <Image
        className="avatar--medium-small"
        name={stageName}
        responsiveImage={false}
        src={profileImageURL}
      />
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Stage name</span> {stageName}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Type</span>
      {entertainerType}
    </td>
    <td className="align-middle text-yellow">
      <span className="text-muted small--4">Your Offer</span> &#8358;{' '}
      {moneyFormat(askingPrice)}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">{eventType}</span>
      {getShortDate(eventDate)}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Status</span>
      {status}
    </td>
    <td>
      <a
        className="btn btn-info btn-sm btn-transparent"
        href={`/entertainers/${slug}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Profile
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button className="btn btn-danger btn-sm btn-transparent">Pay</button>
    </td>
  </tr>
);

RequestsRow.propTypes = {
  askingPrice: PropTypes.string,
  entertainerId: PropTypes.string,
  entertainerType: PropTypes.string,
  eventDate: PropTypes.string,
  eventType: PropTypes.string,
  number: PropTypes.number,
  profileImageURL: PropTypes.string,
  slug: PropTypes.string,
  stageName: PropTypes.string,
  status: PropTypes.string,
};

Requests.defaultProps = {
  askingPrice: '',
  entertainerId: '',
  entertainerType: '',
  eventDate: '',
  eventType: '',
  number: 0,
  profileImageURL: '',
  slug: '',
  stageName: '',
  status: '',
};

export default Requests;
