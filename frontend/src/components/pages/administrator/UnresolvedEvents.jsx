import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import AdminList from 'components/common/pages/AdminList';
import {
  twoDigitNumber,
  // getRequestStatusIcon,
  moneyFormatInNaira,
} from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import { Link } from '@reach/router';

const UnresolvedEvents = () => {
  return (
    <BackEndPage title="Unresolved Events">
      <AdminList
        apiData="result"
        apiUrl="/api/v1/cancel-evententertainer"
        pageName="Unresolved Event"
        tableRow={VideoRow}
      />
    </BackEndPage>
  );
};

const VideoRow = ({
  cancelledBy,
  cancelledDate,
  id,
  number,
  refundEventOwner,
  payEntertainerDiscount,
  eventEntertainer,
  hoursDiff,
}) => {
  return (
    <tr>
      <th className="table__number align-middle" scope="row">
        {twoDigitNumber(number)}
      </th>

      <td className="align-middle">
        <small className="small--4 text-muted">Event</small>
        <span className="table__title">{eventEntertainer.event.eventType}</span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Hours Diff</small>
        <span className="text-muted-light-2">{hoursDiff} Hours</span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">
          Cancelled by {cancelledBy}
        </small>
        <span className="text-muted-light-2">
          On {getShortDate(cancelledDate)}
        </span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">User</small>
        <span className="text-muted-light-2">
          {moneyFormatInNaira(refundEventOwner)}
        </span>
      </td>

      <td className="align-middle text-left">
        <small className="small--4 text-muted">Entertainer</small>
        <span className="text-muted-light-2">
          {payEntertainerDiscount > 0
            ? moneyFormatInNaira(payEntertainerDiscount)
            : '-'}
        </span>
      </td>

      <td className="align-middle">
        <Link
          className="btn btn-info btn-sm btn-transparent"
          to={`/admin/unresolved-event/${id}`}
        >
          Resolve
        </Link>
      </td>
    </tr>
  );
};

VideoRow.defaultProps = {
  cancelledBy: null,
  cancelledDate: null,
  cancelledReason: null,
  eventApplication: {},
  eventEntertainer: {},
  hoursDiff: null,
  payEntertainerDiscount: null,
  refundEventOwner: null,
};

VideoRow.propTypes = {
  cancelledBy: PropTypes.string,
  cancelledDate: PropTypes.string,
  cancelledReason: PropTypes.string,
  eventApplication: PropTypes.object,
  eventEntertainer: PropTypes.object,
  hoursDiff: PropTypes.any,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  payEntertainerDiscount: PropTypes.string,
  refundEventOwner: PropTypes.string,
};

export default UnresolvedEvents;
