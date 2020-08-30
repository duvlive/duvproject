import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber, moneyFormat } from 'utils/helpers';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { getLongDate, getShortDate } from 'utils/date-helpers';
import InputFormat from 'components/forms/InputFormat';
import DatePicker from 'components/forms/DatePicker';
import Select from 'components/forms/Select';
import { Link } from '@reach/router';

const UsersPayments = () => {
  return (
    <BackEndPage title="Users Payments">
      <AdminList
        apiData="payments"
        apiUrl="/api/v1/payments"
        FilterComponent={UsersPaymentFilter}
        limit={20}
        pageName="Users Payment"
        tableRow={UserPaymentsRow}
      />
    </BackEndPage>
  );
};

const UserPaymentsRow = ({
  amount,
  gateway_response,
  number,
  paid_at,
  status,
  metadata,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <small className="small--4 text-muted">Amount (NGN)</small>
      <h5 className="text-white">{moneyFormat(amount / 100) || '-'}</h5>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Response</small>
      {status === 'success' ? (
        <span className="text-green text-uppercase">
          <i className="icon icon-ok-circled"></i> {gateway_response}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-cancel"></i> {gateway_response}
        </span>
      )}
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Paid At</small>
      <span className="text-muted">{getLongDate(paid_at) || '-'}</span>
    </td>

    <td className="align-middle">
      {metadata && (
        <Link
          className="btn btn-info btn-sm btn-transparent"
          to={`/admin/user-payments/${metadata.custom_fields[0].value}`}
        >
          View Details
        </Link>
      )}
    </td>
  </tr>
);

UserPaymentsRow.defaultProps = {
  amount: null,
  gateway_response: null,
  paid_at: null,
  status: null,
};

UserPaymentsRow.propTypes = {
  amount: PropTypes.number,
  gateway_response: PropTypes.string,
  metadata: PropTypes.object.isRequired,
  number: PropTypes.any.isRequired,
  paid_at: PropTypes.string,
  status: PropTypes.string,
};

export const UsersPaymentFilter = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={{
        amount: '',
        from: '',
        to: '',
        status: '',
      }}
      onSubmit={({ amount, from, to, status }, actions) => {
        const amountInNaira = amount ? amount * 100 : null;
        setFilterTerms(
          {
            amount: amountInNaira,
            from: from.date ? from.date.toISOString() : '',
            to: to.date ? to.date.toISOString() : '',
            status,
          },
          {
            amount: `Amount: ${amountInNaira}`,
            from: `From ${getShortDate(from.date)}`,
            to: `To ${getShortDate(to.date)}`,
            status: `Status: ${status}`,
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
                blankOption="Select Status"
                formGroupClassName="col-md-6"
                label="Status"
                name="status"
                optional
                options={[
                  { value: 'failed' },
                  { value: 'success' },
                  { value: 'abandoned' },
                ]}
              />
            </div>
            <div className="form-row">
              <DatePicker
                formGroupClassName="col-md-6"
                label="From Date"
                name="from"
                optional
                placeholder="From Date"
              />
              <DatePicker
                formGroupClassName="col-md-6"
                label="To Date"
                name="to"
                optional
                placeholder="To Date"
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

UsersPaymentFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default UsersPayments;
