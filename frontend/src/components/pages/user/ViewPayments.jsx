import React from 'react';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import axios from 'axios';
import * as queryString from 'query-string';
import BackEndPage from 'components/common/layout/BackEndPage';

import DUVLiveLogo from 'assets/img/logo/red-black.svg';
import { getTinyDate } from 'utils/date-helpers';
import { moneyFormat } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';

const ViewPayments = props => {
  const [loading, setLoading] = React.useState(true);
  const queryParams = queryString.parse(props.location.search);
  const { reference } = queryParams;
  const [paymentInfo, setPaymentInfo] = React.useState([]);
  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/paystack/verify/${reference}`)
      .then(function(response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          axios
            .post(
              `/api/v1/applications/approve/${data.payment.metadata.custom_fields[0].value}`,
              {},
              {
                headers: {
                  'x-access-token': getTokenFromStore()
                }
              }
            )
            .then(function(response) {
              const { status } = response;
              console.log('data', data);
              // handle success
              if (status === 200) {
                setPaymentInfo(data.payment);
                setApplication(response.data.application);
                setLoading(false);
              }
            })
            .catch(function(error) {
              console.log(error.response.data.message);
              // TODO: Add error here
              setLoading(false);
            });
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
        setLoading(false);
      });
  }, [reference]);

  if (
    !objectPath.get(paymentInfo, 'customer', null) ||
    !objectPath.get(application, 'eventEntertainerInfo.event.eventType', null)
  ) {
    // Display error here
  }

  return (
    <BackEndPage title="Payment Receipt">
      <div className="main-app">
        <section className="app-content">
          <section className="payments">
            <LoadingScreen loading={loading} text="Generating your Receipt">
              {!loading && (
                <div className="duv-live-invoice">
                  <section className="row invoice__page">
                    <div className="col-sm-12 mb-4">
                      <div className="card-body d-flex flex-column">
                        {/* Logo */}
                        <div className="d-flex align-self-center text-center">
                          <img alt="Logo" height="125" src={DUVLiveLogo} />
                        </div>

                        {/* Header Details */}
                        <div className="invoice__separator">
                          <div className="d-flex flex-column">
                            <table>
                              <tbody>
                                <tr className="tr-content">
                                  <td colSpan={2}>
                                    <h6 className="mb-3">
                                      {paymentInfo.customer.email}
                                    </h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="mb-0">
                                      Date Issued:{' '}
                                      <strong>
                                        {getTinyDate(paymentInfo.paidAt)}
                                      </strong>
                                    </p>
                                  </td>
                                  <td className="text-right">
                                    <p className="mb-0">+234 708 7821 561</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="mb-0">
                                      Receipt No:{' '}
                                      <strong>
                                        3885483
                                        {
                                          paymentInfo.metadata.custom_fields[0]
                                            .value
                                        }
                                      </strong>
                                    </p>
                                  </td>
                                  <td className="text-right">
                                    <p className="mb-0">info@duvlive.com</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                    <p className="mb-0">
                                      Ref. :{' '}
                                      <strong className="text-uppercase">
                                        {paymentInfo.reference}
                                      </strong>
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Receipt Details */}
                        <table className="invoice__separator invoice__table">
                          <thead>
                            <tr className="tr-header tr-border-bottom">
                              <th>EVENT DESCRIPTION</th>
                              <th className="text-right">TOTAL</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="tr-content">
                              <td>
                                <p className="mt-5">
                                  Payment to{' '}
                                  <strong>
                                    {application.user.profile.stageName} (
                                    {
                                      application.eventEntertainerInfo
                                        .entertainerType
                                    }
                                    )
                                  </strong>
                                </p>
                              </td>
                              <td className="text-right text-amount strong">
                                {paymentInfo.currency}{' '}
                                {moneyFormat(paymentInfo.amount / 100)}
                              </td>
                            </tr>
                            <tr className="tr-content">
                              <td>
                                <p>
                                  Event Name:{' '}
                                  {
                                    application.eventEntertainerInfo.event
                                      .eventType
                                  }
                                  <br />
                                  Duration:{' '}
                                  {
                                    application.eventEntertainerInfo.event
                                      .eventDuration
                                  }
                                  <br />
                                  Place of Event:{' '}
                                  {
                                    application.eventEntertainerInfo
                                      .placeOfEvent
                                  }
                                </p>
                              </td>
                              <td>&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="invoice__separator"></div>
                      </div>
                    </div>
                  </section>

                  {/* Footer Details */}
                  <section className="row invoice__page invoice__footer">
                    <div className="col-sm-12">
                      <div className="d-flex flex-column">
                        <table className="mt-5 invoice__table">
                          <thead>
                            <tr className="tr-header tr-border-bottom">
                              <th>PAYMENT INFO</th>
                              <th>PAID ON</th>
                              <th className="text-right">TOTAL</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="tr-content tr-border-bottom">
                              <td>
                                <small>
                                  {paymentInfo.authorization.bank}: (
                                  {paymentInfo.authorization.card_type})
                                  <br />
                                  Card: **** **** ****{' '}
                                  {paymentInfo.authorization.last4}
                                </small>
                              </td>
                              <td>
                                <h4 className="my-4">
                                  {getTinyDate(paymentInfo.paidAt)}
                                </h4>
                              </td>
                              <td className="text-right text-green">
                                <h4 className="text-amount">
                                  {' '}
                                  {paymentInfo.currency}{' '}
                                  {moneyFormat(paymentInfo.amount / 100)}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="row invoice__separator">
                          <div className="col-md-6">
                            <h4>
                              <span className="icon icon-heart text-danger"></span>{' '}
                              Thank You!
                            </h4>
                          </div>
                          <div className="col-md-6 text-right">
                            <p className="text-uppercase invoice__tag-line">
                              Live your best Life
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </LoadingScreen>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewPayments.propTypes = {
  location: PropTypes.object
};

ViewPayments.defaultProps = {
  location: {
    search: ''
  }
};

export default ViewPayments;
