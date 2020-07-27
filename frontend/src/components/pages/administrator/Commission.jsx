import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber, getNairaSymbol } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';
import DuvLiveModal from 'components/custom/Modal';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { addCommissionObject } from 'components/forms/schema/commissionSchema';
import { setInitialValues } from 'components/forms/form-helper';
import Input from 'components/forms/Input';
import { createSchema } from 'components/forms/schema/schema-helpers';

const Commission = () => {
  return (
    <BackEndPage title="Commission">
      <AdminList
        AddNewComponent={AddNewComponent}
        apiData="result"
        apiUrl="/api/v1/commissions-all"
        pageName="Commission"
        tableRow={CommissionRow}
      />
    </BackEndPage>
  );
};

const CommissionRow = ({
  id,
  title,
  number,
  recommendationsCommission,
  directHireCommission,
  bidsCommission,
  handlingPercent,
  handlingPlus,
  setMessage,
  ...props
}) => {
  const makeCommissionDefault = (id) => {
    axios
      .put(
        `/api/v1/commission/set-as-default`,
        { id },
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: `Commission has successfully been set as DEFAULT`,
          });
        }
      })
      .catch(function (error) {
        console.log('error', error);
        setMessage({
          type: 'danger',
          message: error.response.message,
        });
      });
  };
  const actionFn = () => makeCommissionDefault(id);
  const actionText = 'Set As Default';

  const modalProps = {
    body: <h3 className="font-weight-normal">{title}</h3>,
    actionFn,
    actionText,
  };

  return (
    <tr>
      <th className="table__number align-middle" scope="row">
        {twoDigitNumber(number)}
      </th>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Title</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {title} {props.default && <i className="icon icon-ok-circled" />}
        </span>
      </td>

      <td className="align-middle text-center">
        <small className="small--4 text-muted">Recommendations</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {recommendationsCommission}%
        </span>
      </td>

      <td className="align-middle text-center">
        <small className="small--4 text-muted">Direct Hire</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {directHireCommission}%
        </span>
      </td>
      <td className="align-middle text-center">
        <small className="small--4 text-muted">Bids</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {bidsCommission}%
        </span>
      </td>

      <td className="align-middle text-center">
        <small className="small--4 text-muted">Handling (%)</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {handlingPercent}%
        </span>
      </td>

      <td className="align-middle text-center">
        <small className="small--4 text-muted">Handling (+)</small>
        <span
          className={`${
            props.default ? 'text-green-100' : 'text-muted-light-2'
          }`}
        >
          {getNairaSymbol()} {handlingPlus}
        </span>
      </td>

      <td className="align-middle">
        {!props.default && (
          <DuvLiveModal {...modalProps}>
            <button className="btn btn-sm btn-transparent btn-info">
              Set As Default
            </button>
          </DuvLiveModal>
        )}
      </td>
    </tr>
  );
};

CommissionRow.defaultProps = {};

CommissionRow.propTypes = {
  bidsCommission: PropTypes.any.isRequired,
  default: PropTypes.bool.isRequired,
  directHireCommission: PropTypes.any.isRequired,
  handlingPercent: PropTypes.any.isRequired,
  handlingPlus: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  recommendationsCommission: PropTypes.any.isRequired,
  setMessage: PropTypes.func.isRequired,
  title: PropTypes.any.isRequired,
};

export const AddNewComponent = ({ addData, setMessage }) => {
  return (
    <Formik
      initialValues={setInitialValues(addCommissionObject)}
      onSubmit={(value, actions) => {
        axios
          .post('/api/v1/commissions', value, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              addData(data.commission);
              setMessage({ message: data.message, type: 'success' });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <h5 className="sub-title py-3">Add New Commission</h5>
            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                label="Title"
                name="title"
                placeholder="Commission Title"
              />
              <Input
                formGroupClassName="col-md-6"
                label="Bids Commission (%)"
                name="bidsCommission"
                placeholder="% of bids commission"
              />
            </div>
            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                label="Direct Hire Commission (%)"
                name="directHireCommission"
                placeholder="% of direct hire commission"
              />
              <Input
                formGroupClassName="col-md-6"
                label="Recommendations Commission (%)"
                name="recommendationsCommission"
                placeholder="% of recommendations commission"
              />
            </div>
            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                label="Handling Percent (%)"
                name="handlingPercent"
                placeholder="% of handling free"
              />

              <Input
                formGroupClassName="col-md-6"
                label="Handling Fee (+)"
                name="handlingPlus"
                placeholder="additional amount to add to handling fee"
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Add Commission
              </Button>
            </div>
          </>
        </Form>
      )}
      validationSchema={createSchema(addCommissionObject)}
    />
  );
};

AddNewComponent.propTypes = {
  addData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Commission;
