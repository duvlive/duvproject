import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import { Link } from '@reach/router';
import { twoDigitNumber, moneyFormatInNaira } from 'utils/helpers';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { getShortDate } from 'utils/date-helpers';
import { moneyFormat, getRequestStatusIcon } from 'utils/helpers';
import NoContent from 'components/common/utils/NoContent';
import Image from 'components/common/utils/Image';
import { REQUEST_ACTION } from 'utils/constants';
import LoadItems from 'components/common/utils/LoadItems';

const Requests = () => {
  const [requests, setRequests] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/user/requests', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setRequests(data.requests);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setRequests([]);
        // navigate to all events
      });
  }, []);
  return (
    <BackEndPage title="Requests">
      <div className="main-app">
        <TopMessage message="Requests" />

        <section className="app-content">
          <LoadItems
            items={requests}
            loadingText="Loading your Requests"
            noContent={
              <NoContent
                isButton
                linkText="Add a New Event"
                linkTo="/user/events/new"
                text={
                  <>
                    No Request Found.
                    <div className="small mt-3">
                      You can create a new Request after adding a new Event
                    </div>
                  </>
                }
              />
            }
          >
            <RequestsTable requests={requests || []} />
          </LoadItems>
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
            applicationId={request.id}
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
            proposedPrice={request.proposedPrice}
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
  applicationId,
  askingPrice,
  entertainerType,
  eventDate,
  eventType,
  number,
  profileImageURL,
  proposedPrice,
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
        className="avatar--medium--small"
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
      <span className="text-red">{entertainerType}</span>
    </td>
    {status === REQUEST_ACTION.INCREMENT ? (
      <td className="align-middle text-white">
        <span className="text-muted small--4">Your Offer</span> &#8358;{' '}
        <strike>{moneyFormat(askingPrice)}</strike>
      </td>
    ) : (
      <td className="align-middle text-white">
        <span className="text-muted small--4">Your Offer</span> &#8358;{' '}
        {moneyFormat(askingPrice)}
      </td>
    )}
    <td className="align-middle text-yellow">
      <span className="text-muted small--4">Proposed Offer</span>
      {proposedPrice === null ? (
        <span className="text-muted-light">None</span>
      ) : (
        moneyFormatInNaira(proposedPrice)
      )}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">{eventType}</span>
      {getShortDate(eventDate)}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Status</span>
      <small>{getRequestStatusIcon(status)}</small>
    </td>

    <td className="pt-4">
      <a
        className="btn btn-info btn-sm btn-transparent"
        href={`/entertainers/profile/${slug}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        View Profile
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        className="btn btn-danger btn-sm btn-transparent"
        to={`/user/request/view/${applicationId}`}
      >
        View Request
      </Link>
    </td>
  </tr>
);

RequestsRow.propTypes = {
  applicationId: PropTypes.any,
  askingPrice: PropTypes.string,
  entertainerId: PropTypes.number,
  entertainerType: PropTypes.string,
  eventDate: PropTypes.string,
  eventType: PropTypes.string,
  number: PropTypes.any,
  profileImageURL: PropTypes.string,
  proposedPrice: PropTypes.string,
  slug: PropTypes.string,
  stageName: PropTypes.string,
  status: PropTypes.string,
};

Requests.defaultProps = {
  applicationId: '',
  askingPrice: '',
  entertainerId: 0,
  entertainerType: '',
  eventDate: '',
  eventType: '',
  number: 0,
  profileImageURL: '',
  proposedPrice: '',
  slug: '',
  stageName: '',
  status: '',
};

export default Requests;
