import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import AdminList from 'components/common/pages/AdminList';
import {
  twoDigitNumber,
  // getRequestStatusIcon,
  moneyFormatInNaira,
} from 'utils/helpers';
// import { approval, getStatus } from 'components/pages/entertainer/Gallery';
// import { Formik, Form } from 'formik';
// import Button from 'components/forms/Button';
// import Select from 'components/forms/Select';
// import { getTokenFromStore } from 'utils/localStorage';
// import DuvLiveModal from 'components/custom/Modal';
// import { useEntertainerSelect } from 'utils/useHooks';
import { getShortDate, remainingDays } from 'utils/date-helpers';

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
  // cancelledReason,
  // id,
  number,
  refundEventOwner,
  // eventOwnerRefunded,
  payEntertainerDiscount,
  // entertainerPaid,
  eventEntertainer,
  eventApplication,
  // setMessage,
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
        <small className="small--4 text-muted">Day to Event</small>
        <span className="text-muted-light-2">
          {remainingDays(eventEntertainer.event.startTime)}
        </span>
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
          {moneyFormatInNaira(payEntertainerDiscount)}
        </span>
      </td>

      <td className=" align-middle">
        <Image
          className="avatar--small"
          name={`${number}-entertainer`}
          responsiveVideo={false}
          src={eventApplication.user.profileImageURL || ProfileAvatar}
        />
        <span className="small--3 d-block">
          {eventApplication.user.profile.stageName || '-'}
        </span>
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
  // entertainerPaid,
  // eventOwnerRefunded,
  payEntertainerDiscount: null,
  refundEventOwner: null,
};

VideoRow.propTypes = {
  cancelledBy: PropTypes.string,
  cancelledDate: PropTypes.string,
  cancelledReason: PropTypes.string,
  eventApplication: PropTypes.object,
  eventEntertainer: PropTypes.object,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  payEntertainerDiscount: PropTypes.string,
  refundEventOwner: PropTypes.string,
  // eventOwnerRefunded,
  // entertainerPaid,
  // setMessage: PropTypes.func.isRequired,
};

// export const VideoFilter = ({ setFilterTerms }) => {
//   const entertainers = useEntertainerSelect();

//   const VIDEO_STATE = [
//     { label: 'Any' },
//     { label: 'Pending' },
//     { label: 'Approved' },
//     { label: 'Rejected' },
//   ];
//   return (
//     <Formik
//       initialValues={{
//         approved: 'Any',
//         userId: '',
//       }}
//       onSubmit={({ approved, userId }, actions) => {
//         const selectedEntertainer = entertainers.filter(
//           (entertainer) => entertainer.value.toString() === userId
//         );
//         setFilterTerms(
//           { approved, userId },
//           {
//             approved: `Approval State: ${approved}`,
//             userId: `Entertainer: '${
//               (selectedEntertainer[0] && selectedEntertainer[0].label) || 'None'
//             }'`,
//           }
//         );
//         actions.setSubmitting(false);
//       }}
//       render={({ isSubmitting, handleSubmit }) => (
//         <Form className="card card-custom card-black card-form p-4">
//           <>
//             <div className="form-row">
//               <Select
//                 formGroupClassName="col-md-6"
//                 label="Approval State"
//                 name="approved"
//                 optional
//                 options={VIDEO_STATE}
//                 placeholder="UnresolvedEvent Type"
//               />
//               <Select
//                 blankOption="Select Entertainer"
//                 formGroupClassName="col-md-6"
//                 label="Entertainer"
//                 name="userId"
//                 optional
//                 options={entertainers}
//                 placeholder="Select Entertainer"
//               />
//             </div>
//             <div className="form-group">
//               <Button
//                 color="danger"
//                 loading={isSubmitting}
//                 onClick={handleSubmit}
//               >
//                 Filter UnresolvedEvent
//               </Button>
//             </div>
//           </>
//         </Form>
//       )}
//     />
//   );
// };

// VideoFilter.propTypes = {
//   setFilterTerms: PropTypes.func.isRequired,
// };

export default UnresolvedEvents;
