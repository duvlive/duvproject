import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import axios from 'axios';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import { getNairaSymbol, commaNumber, moneyFormat } from 'utils/helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import Image from 'components/common/utils/Image';
import AlertMessage from 'components/common/utils/AlertMessage';
import DuvLiveModal from 'components/custom/Modal';
import { UserContext } from 'context/UserContext';
import { navigate } from '@reach/router';

const PayPendingEntertainer = ({ applicationId }) => {
  const [message, setMessage] = React.useState({ msg: null, type: 'error' });
  const [application, setApplication] = React.useState(null);
  const [loadingPage, setLoadingPage] = React.useState(true);

  let { userDispatch } = React.useContext(UserContext);

  const payEntertainerNow = () => {
    axios
      .post(
        `/api/v1/pay/entertainer`,
        {
          amount: application.takeHome,
          eventEntertainerId: application.eventEntertainerId,
        },
        {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        }
      )
      .then(function (response) {
        const { status } = response;
        // handle success
        if (status === 200) {
          userDispatch({
            type: 'add-alert',
            alert: 'payment-success',
          });
          navigate('/admin/pending-payments');
        } else {
          setMessage({ msg: response.data.message });
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setMessage({ msg: error.response.data.message });
      });
  };

  const approveRequestModalBody = () => (
    <>
      <div className="text-center">
        <Image
          className="avatar--large"
          name={application.user.profile.stageName || 'No name'}
          responsiveImage={false}
          src={application.user.profileImageURL}
        />
        <h4 className="font-weight-normal mt-3">
          {application.user.profile.stageName}
        </h4>
        <h5 className="text-yellow mt-3 mb-4">
          &#8358; {moneyFormat(application.takeHome)}
        </h5>
      </div>
      <div className="small--2">
        <h6 className="text-white">Note</h6>
        Confirming this will <strong>notify</strong> the entertainer that they
        have been paid their outstanding payment of{' '}
        <strong className="text-yellow">
          &#8358; {moneyFormat(application.takeHome)}
        </strong>{' '}
        . Kindly ensure that this has been paid to their account before clicking
        on the CONFIRM button.
      </div>
    </>
  );

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
    <BackEndPage title="Pay Pending Entertainer">
      <div className="main-app">
        <TopMessage />

        <AlertMessage message={message.msg} type={message.type} />

        {loadingPage ? (
          <LoadingScreen text="Loading Request" />
        ) : (
          <section className="app-content row">
            <div className="col-sm-12">
              <h3 className="main-app__title">Pay Entertainer</h3>
            </div>
            <div className="col-sm-6">
              <div className="card card-custom card-black">
                <div className="card-body">
                  <section className="text-center">
                    <Image
                      bordered
                      className="avatar--large"
                      name={application.user.profile.stageName}
                      src={application.user.profileImageURL}
                    />
                    <br />
                    <small className="">
                      {application.user.profile.stageName}
                    </small>

                    <h3 className="text-yellow mt-3 mb-5 text-font">
                      {getNairaSymbol()}
                      {commaNumber(application.takeHome)}
                    </h3>

                    <DuvLiveModal
                      actionFn={() => payEntertainerNow()}
                      actionText="Confirm Payment"
                      body={approveRequestModalBody()}
                      closeModalText="Cancel"
                      title="Approve Request"
                    >
                      <button className="btn btn-danger btn-lg btn-wide btn-transparent">
                        Confirm Payment
                      </button>
                    </DuvLiveModal>
                  </section>
                </div>
              </div>

              <h6 className="mt-5 text-muted-light">Bank Details</h6>
              <ul className="list-group mb-5">
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Account Number
                  </small>
                  <h5 className="event-list-label">
                    <span className="account-number">
                      {application.user.bankDetail.accountNumber}
                    </span>
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Account Name
                  </small>
                  <h5 className="event-list-label">
                    {application.user.bankDetail.accountName}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Bank Name
                  </small>
                  <h5 className="event-list-label">
                    {application.user.bankDetail.bankName}
                  </h5>
                </li>
              </ul>

              <h6 className="mt-5 text-muted-light">Price Details</h6>
              <ul className="list-group mb-5">
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Event Owner
                  </small>
                  <h5 className="event-list-label">
                    <Image
                      bordered
                      className="avatar--medium--small"
                      name={
                        application.eventEntertainerInfo.event.owner
                          .profileImageURL
                      }
                      src={
                        application.eventEntertainerInfo.event.owner
                          .profileImageURL
                      }
                    />{' '}
                    {application.eventEntertainerInfo.event.owner.firstName}{' '}
                    {application.eventEntertainerInfo.event.owner.lastName}{' '}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Amount Paid
                  </small>
                  <h5 className="event-list-label">
                    {getNairaSymbol()}
                    {commaNumber(
                      application.proposedPrice || application.askingPrice
                    )}
                  </h5>
                </li>
                <li className="list-group-item">
                  <small className="small-text__with-icon">
                    <i className="icon icon-events"></i>
                    Commission Used
                  </small>
                  <h5 className="event-list-label">
                    {application.commission
                      ? application.commission.title
                      : 'Inbuilt Commission'}
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
            </div>
            <div className="col-sm-6">
              <h6>Event Details</h6>
              <ViewEvent.EventDetailsCard
                event={eventEntertainer.event}
                transparent
              />
              <h6 className="mt-5 text-muted-light">Requirements</h6>
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

PayPendingEntertainer.propTypes = {
  applicationId: PropTypes.string,
};

PayPendingEntertainer.defaultProps = {
  applicationId: null,
};

export default PayPendingEntertainer;
