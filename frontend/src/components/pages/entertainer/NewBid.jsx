import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Button from 'components/forms/Button';
import AlertMessage from 'components/common/utils/AlertMessage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { bidSchema } from 'components/forms/schema/entertainerSchema';
import ViewEvent from '../user/ViewEvent';
import { getTokenFromStore } from 'utils/localStorage';
import {
  getBudgetRange,
  moneyFormat,
  getPercentage,
  getNairaSymbol
} from 'utils/helpers';
import { remainingDays } from 'utils/date-helpers';
import { navigate } from '@reach/router';
import InputFormat from 'components/forms/InputFormat';
import { VAT, DEFAULT_COMMISSION } from 'utils/constants';

const NewBid = ({ eventEntertainerId }) => {
  const [eventEntertainer, setEventEntertainer] = React.useState({
    id: eventEntertainerId,
    lowestBudget: 0,
    highestBudget: 0,
    event: { eventType: '', eventDate: '' }
  });

  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/eventEntertainer/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore()
          }
        })
        .then(function(response) {
          const { status, data } = response;
          console.log('data', data);
          // handle success
          if (status === 200) {
            setEventEntertainer(data.eventEntertainerInfo);
          }
        })
        .catch(function(error) {
          console.log(error.response.data.message);
          // navigate to all events
        });
  }, [eventEntertainerId]);

  return (
    <BackEndPage title="New Bid">
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
            <BidsForm eventEntertainer={eventEntertainer} />
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

NewBid.propTypes = {
  eventEntertainerId: PropTypes.string
};

NewBid.defaultProps = {
  eventEntertainerId: null
};

const BidsForm = ({ eventEntertainer }) => {
  const [message, setMessage] = React.useState(null);

  const [commission, setCommission] = React.useState(DEFAULT_COMMISSION);
  React.useEffect(() => {
    axios
      .get('/api/v1/currentCommission')
      .then(function(response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setCommission(data.commission);
          console.log('data.commission: ', data.commission);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <div className="card card-custom card-black card-form">
      <div className="card-body col-md-10">
        <h6 className="text-blue font-weight-normal">
          Budget:{' '}
          {getBudgetRange(
            eventEntertainer.lowestBudget,
            eventEntertainer.highestBudget
          )}{' '}
        </h6>
        <Formik
          enableReinitialize={true}
          initialValues={{ askingPrice: '' }}
          onSubmit={(values, actions) => {
            const payload = {
              status: 'Pending',
              askingPrice: values.askingPrice,
              eventId: eventEntertainer.eventId,
              eventEntertainerId: eventEntertainer.id
            };
            console.log('payload', payload);
            axios
              .post('/api/v1/application', payload, {
                headers: { 'x-access-token': getTokenFromStore() }
              })
              .then(function(response) {
                const { status, data } = response;
                console.log('data', data);
                if (status === 200) {
                  setMessage({
                    type: 'info',
                    message: `Your bid has been successfully submitted.`
                  });
                  navigate('/entertainer/bids');
                  actions.setSubmitting(false);
                }
              })
              .catch(function(error) {
                setMessage(error.response.data.message);
                actions.setSubmitting(false);
              });
            actions.setSubmitting(false);
          }}
          render={({ isSubmitting, handleSubmit, ...props }) => {
            const askingPrice = parseInt(props.values.askingPrice, 10) || 0;
            const showCalculator =
              askingPrice !== 0 &&
              askingPrice >= parseInt(eventEntertainer.lowestBudget, 10) &&
              askingPrice <= parseInt(eventEntertainer.highestBudget, 10);

            return (
              <>
                <Form>
                  <AlertMessage {...message} />
                  <InputFormat
                    label="Asking Price"
                    name="askingPrice"
                    placeholder="Your Bid"
                    type="number"
                  />

                  {showCalculator && (
                    <PriceCalculator
                      askingPrice={askingPrice}
                      commission={commission}
                    />
                  )}
                  <Button
                    className="btn-danger btn-wide btn-transparent"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Place Bid
                  </Button>
                </Form>
              </>
            );
          }}
          validationSchema={createSchema(
            bidSchema(
              eventEntertainer.lowestBudget,
              eventEntertainer.highestBudget
            )
          )}
        />
      </div>
    </div>
  );
};

BidsForm.propTypes = {
  eventEntertainer: PropTypes.object.isRequired,
  values: PropTypes.object
};

BidsForm.defaultProps = {
  values: {}
};
export const PriceCalculator = ({ askingPrice, commission }) => {
  const [showBreakdown, setShowBreakdown] = React.useState(false);

  const { bidsCommission, handlingPercent, handlingPlus } = commission;
  const calcCommission = getPercentage(bidsCommission) * askingPrice;
  const calcVat = getPercentage(VAT) * calcCommission;
  const handling =
    getPercentage(handlingPercent) * askingPrice + parseInt(handlingPlus, 10);
  const amountToPay = askingPrice - (calcCommission + calcVat + handling);
  const entertainerFee = amountToPay > 0 ? amountToPay : 0;
  return (
    <>
      <h4 className="mb-4 text-font">
        You will be paid {getNairaSymbol()}
        {moneyFormat(entertainerFee)}{' '}
      </h4>

      {showBreakdown ? (
        <div className="card card-custom">
          <div className="card-body">
            <h5 className="card-title text-yellow">Breakdown</h5>
            <div className="table-responsive">
              <table className="table table-dark">
                <tbody>
                  <tr>
                    <td>Your Bid</td>
                    <td className="text-right">
                      {getNairaSymbol()}
                      {moneyFormat(askingPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td>Commission ({bidsCommission}%)</td>
                    <td className="text-negative text-right">
                      - {moneyFormat(calcCommission)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      VAT ({VAT}%)
                      <small className="small--3 d-block text-muted">
                        From commision
                      </small>
                    </td>
                    <td className="text-negative text-right">
                      - {moneyFormat(calcVat)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Handling ({handlingPercent}% + N{handlingPlus})
                    </td>
                    <td className="text-negative text-right">
                      - {moneyFormat(handling)}
                    </td>
                  </tr>
                  <tr>
                    <td>You will be paid</td>
                    <td className="text-white text-right">
                      <h6>
                        {getNairaSymbol()}
                        {moneyFormat(entertainerFee)}
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-link mb-4" onClick={() => setShowBreakdown(true)}>
          See Breakdown
        </div>
      )}
    </>
  );
};

PriceCalculator.propTypes = {
  askingPrice: PropTypes.number.isRequired,
  commission: PropTypes.object.isRequired
};
export default NewBid;
