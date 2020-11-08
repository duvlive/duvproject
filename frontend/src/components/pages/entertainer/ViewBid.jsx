import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { remainingDays } from 'utils/date-helpers';
import {
  getNairaSymbol,
  commaNumber,
  getRequestStatusIcon,
} from 'utils/helpers';
import PriceCalculator from 'components/common/utils/PriceCalculator';
import { DEFAULT_COMMISSION, REQUEST_ACTION } from 'utils/constants';
import { navigate } from '@reach/router';
import { eventHasExpired } from 'utils/event-helpers';

const ViewBid = ({ applicationId }) => {
  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    applicationId &&
      axios
        .get(`/api/v1/applications/${applicationId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;

          // handle success
          if (status === 200) {
            setApplication(data.application);
          }
        })
        .catch(function (error) {
          navigate('/entertainer/bids');
        });
  }, [applicationId]);

  if (!application) {
    return null;
  }

  const eventEntertainer = application.eventEntertainerInfo;

  const updatedStatus =
    eventHasExpired(application.eventEntertainerInfo.auctionEndDate) &&
    application.status === REQUEST_ACTION.PENDING
      ? REQUEST_ACTION.EXPIRED
      : application.status;

  return (
    <BackEndPage title="Placed Bid">
      <div className="main-app">
        <TopMessage />

        <section className="app-content row">
          <div className="col-sm-12 mb-5">
            <h3 className="main-app__title">
              Bid for {eventEntertainer.event.eventType} <br />{' '}
              <small className="main-app__small remaining-time">
                <i className="icon icon-hourglass"></i>
                {remainingDays(eventEntertainer.event.eventDate)}
              </small>
            </h3>
          </div>
          <div className="col-sm-6">
            <div className="card card-custom card-black card-form">
              <div className="card-body">
                <h5 className="text-muted mb-4 text-font">
                  Your Bid: {getNairaSymbol()}
                  {commaNumber(application.askingPrice)}
                  <small className="float-right">
                    {getRequestStatusIcon(updatedStatus, 'Closed')}
                  </small>
                </h5>
                <hr className="d-block mb-4" />
                <PriceCalculator
                  askingPrice={parseInt(application.askingPrice, 10)}
                  commission={application.commission || DEFAULT_COMMISSION}
                  hireType={eventEntertainer.hireType}
                />
              </div>
            </div>
            <h6>Event Details</h6>
            <ViewEvent.EventDetailsCard
              event={eventEntertainer.event}
              transparent
            />
          </div>
          <div className="col-sm-6">
            <h6>Requirements</h6>
            <ViewEvent.EventEntertainerDetailsCard
              eventEntertainer={eventEntertainer}
            />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewBid.propTypes = {
  applicationId: PropTypes.string,
};

ViewBid.defaultProps = {
  applicationId: null,
};

export default ViewBid;
