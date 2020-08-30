import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { getShortDate } from 'utils/date-helpers';
import { getNairaSymbol, commaNumber } from 'utils/helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import Image from 'components/common/utils/Image';

const UserPaymentDetails = ({ applicationId }) => {
  const [application, setApplication] = React.useState(null);
  const [loadingPage, setLoadingPage] = React.useState(true);

  React.useEffect(() => {
    applicationId &&
      axios
        .get(`/api/v1/admin/applications/${applicationId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setApplication(data.application);
            setLoadingPage(false);
          }
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          // TODO: navigate to all events
        });
  }, [applicationId]);

  if (!application) {
    return null;
  }

  const eventEntertainer = application.eventEntertainerInfo;

  return (
    <BackEndPage title="User Payment Details">
      <div className="main-app">
        <TopMessage />

        {loadingPage ? (
          <LoadingScreen text="Loading Request" />
        ) : (
          <section className="app-content row">
            <div className="col-sm-12">
              <h3 className="main-app__title">Payment Details</h3>
            </div>
            <div className="col-sm-6">
              <div className="card card-custom card-blue card-form">
                <div className="card-body">
                  <section className="text-center">
                    <Image
                      bordered
                      className="avatar--large"
                      name={
                        application.eventEntertainerInfo.event.owner
                          .profileImageURL
                      }
                      src={
                        application.eventEntertainerInfo.event.owner
                          .profileImageURL
                      }
                    />

                    <h3 className="text-muted-light-2 mt-3 text-font">
                      {getNairaSymbol()}
                      {commaNumber(
                        application.proposedPrice || application.askingPrice
                      )}
                    </h3>

                    <h6 className="font-weight-normal text-yellow mt-3">
                      Paid By
                    </h6>
                    <small className="">
                      {application.eventEntertainerInfo.event.owner.firstName}{' '}
                      {application.eventEntertainerInfo.event.owner.lastName}{' '}
                    </small>
                  </section>
                </div>
              </div>

              <ul className="list-group mb-5 mt-n3">
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Hired Entertainer
                  </small>
                  <h5 className="event-list-label">
                    <Image
                      bordered
                      className="avatar--medium--small"
                      name={application.user.profile.stageName}
                      src={application.user.profileImageURL}
                    />{' '}
                    {application.user.profile.stageName}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Take Home
                  </small>
                  <h5 className="event-list-label">
                    {getNairaSymbol()}
                    {commaNumber(application.takeHome)}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Paid on
                  </small>
                  <h5 className="event-list-label">
                    {getShortDate(application.paidOn)}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Hired Type
                  </small>
                  <h5 className="event-list-label">
                    {application.eventEntertainerInfo.hireType}
                  </h5>
                </li>
              </ul>

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
        )}
      </div>
    </BackEndPage>
  );
};

UserPaymentDetails.propTypes = {
  applicationId: PropTypes.string,
};

UserPaymentDetails.defaultProps = {
  applicationId: null,
};

export default UserPaymentDetails;
