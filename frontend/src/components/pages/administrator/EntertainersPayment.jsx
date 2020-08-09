import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import Select from 'components/forms/Select';
import InputFormat from 'components/forms/InputFormat';
import { getShortDate } from 'utils/date-helpers';
import { useEntertainerSelect } from 'utils/useHooks';
import { getNairaSymbol, commaNumber } from 'utils/helpers';

const EntertainersPayment = () => {
  return (
    <BackEndPage title="EntertainersPayment">
      <AdminList
        FilterComponent={EntertainerFilter}
        apiData="payments"
        apiUrl="/api/v1/entertainers-payments-all"
        pageName="Entertainer Payment"
        tableRow={EntertainersPaymentRow}
      />
    </BackEndPage>
  );
};

const EntertainersPaymentRow = ({ amount, eventPaidFor, number, paidBy }) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={`${number}-entertainer`}
        responsiveImage={false}
        src={
          eventPaidFor.entertainer.personalDetails.profileImageURL ||
          ProfileAvatar
        }
      />
    </td>
    <td className="align-middle">
      <small className="small--4 text-muted">Entertainer</small>
      <span className="table__title">
        {eventPaidFor.entertainer.stageName || '-'}
      </span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">
        {getShortDate(eventPaidFor.event.eventDate) || '-'}
      </small>
      <span className="text-muted-light-2">
        {eventPaidFor.event.eventType || '-'}
      </span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Amount</small>
      <span className="text-muted-light-2">
        {getNairaSymbol()} {commaNumber(amount) || '-'}
      </span>
    </td>

    <td className=" align-middle">
      <Image
        className="avatar--small"
        name={`${number}-paidBy`}
        responsiveVideo={false}
        src={paidBy.profileImageURL || ProfileAvatar}
      />
      <span className="small--3 d-block">{`${paidBy.firstName} ${paidBy.lastName}`}</span>
    </td>
  </tr>
);

EntertainersPaymentRow.defaultProps = {
  amount: null,
  eventPaidFor: {},
  paidBy: {},
};

EntertainersPaymentRow.propTypes = {
  amount: PropTypes.string,
  eventPaidFor: PropTypes.object,
  number: PropTypes.any.isRequired,
  paidBy: PropTypes.object,
};

export const EntertainerFilter = ({ setFilterTerms }) => {
  const entertainers = useEntertainerSelect('entertainerId');

  return (
    <Formik
      initialValues={{
        approved: 'Any',
        entertainerId: '',
      }}
      onSubmit={({ amount, entertainerId }, actions) => {
        const selectedEntertainer = entertainers.filter(
          (entertainer) => entertainer.value.toString() === entertainerId
        );
        setFilterTerms(
          { amount, entertainerId },
          {
            amount: `Amount: ${amount}`,
            entertainerId: `Entertainer: '${
              (selectedEntertainer[0] && selectedEntertainer[0].label) || 'None'
            }'`,
          }
        );
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <div className="form-row">
              <InputFormat
                formGroupClassName="col-md-6"
                label="Amount"
                name="amount"
                optional
                placeholder="Amount"
                type="number"
              />
              <Select
                blankOption="Select Entertainer"
                formGroupClassName="col-md-6"
                label="Entertainer"
                name="entertainerId"
                optional
                options={entertainers}
                placeholder="Select Entertainer"
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Filter Payment
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

EntertainerFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default EntertainersPayment;
