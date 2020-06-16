import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { approval, getStatus } from 'components/pages/entertainer/Gallery';

// import { Formik, Form } from 'formik';
// import Button from 'components/forms/Button';
// import { feedback } from 'components/forms/form-helper';
// import { LANGUAGE, BUDGET, SELECT_ENTERTAINERS_TYPE } from 'utils/constants';
// import Select from 'components/forms/Select';
// import MultiSelect from 'components/forms/MultiSelect';
// import { recommendGallerySchema } from 'components/forms/schema/gallerySchema';
// import { setInitialValues } from 'components/forms/form-helper';
// import { getStates } from 'data/naija-states-and-lgas';

const Gallery = () => {
  return (
    <BackEndPage title="Gallery">
      <AdminList
        apiData="result"
        apiUrl="/api/v1/gallery-all"
        // FilterComponent={GalleryFilter}
        pageName="Gallery"
        tableRow={GalleryRow}
      />
    </BackEndPage>
  );
};

const GalleryRow = ({ approved, id, number, imageURL, user }) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium"
        name={`gallery-${number}`}
        responsiveImage={false}
        rounded={false}
        src={imageURL}
      />
    </td>
    <td className="align-middle">
      <small className="small--4 text-muted">Stage Name</small>
      <span className="table__title">{user.profile.stageName || '-'}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Status</small>
      <span className="text-muted-light-2">
        {approval[getStatus(approved)].text}
      </span>
    </td>

    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={`${number}-entertainer`}
        responsiveImage={false}
        src={user.profileImageURL || ProfileAvatar}
      />
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-sm btn-transparent btn-danger"
        to={`/admin/gallery/${id}`}
      >
        Manage
      </Link>
    </td>
  </tr>
);

GalleryRow.defaultProps = {
  approved: null,
  number: null,
  imageURL: null,
  user: null,
};

GalleryRow.propTypes = {
  approved: PropTypes.bool,
  id: PropTypes.any.isRequired,
  imageURL: PropTypes.string,
  number: PropTypes.any.isRequired,
  user: PropTypes.object,
};

// export const GalleryFilter = ({ setFilterTerms }) => {
//   const noBudget = { label: 'None', value: '0' };
//   const anyState = { label: 'Any', value: 'Any' };
//   return (
//     <Formik
//       initialValues={setInitialValues(recommendGallerySchema)}
//       onSubmit={(value, actions) => {
//         setFilterTerms({ ...value, language: JSON.stringify(value.language) });
//         actions.setSubmitting(false);
//       }}
//       render={({ isSubmitting, handleSubmit }) => (
//         <Form className="card card-custom card-black card-form p-4">
//           <>
//             <div className="form-row">
//               <Select
//                 blankOption="Choose your preferred Gallery Type"
//                 formGroupClassName="col-md-6"
//                 label="Gallery Type"
//                 name="galleryType"
//                 options={SELECT_ENTERTAINERS_TYPE}
//                 placeholder="Gallery Type"
//                 showFeedback={feedback.ERROR}
//               />
//               <MultiSelect
//                 formGroupClassName="col-md-6"
//                 label="Language"
//                 name="language"
//                 optional
//                 options={LANGUAGE}
//                 placeholder="Preferred Language"
//                 showFeedback={feedback.ERROR}
//               />
//             </div>
//             <div className="form-row">
//               <Select
//                 formGroupClassName="col-md-6"
//                 label="Lowest Budget (in Naira)"
//                 name="lowestBudget"
//                 optional
//                 options={[noBudget, ...BUDGET]}
//                 placeholder="Lowest Budget"
//                 showFeedback={feedback.ERROR}
//               />
//               <Select
//                 formGroupClassName="col-md-6"
//                 label="Highest Budget (in Naira)"
//                 name="highestBudget"
//                 optional
//                 options={[noBudget, ...BUDGET]}
//                 placeholder="Highest Budget"
//                 showFeedback={feedback.ERROR}
//               />
//             </div>
//             <div className="form-row">
//               <Select
//                 blankOption="Select State"
//                 formGroupClassName="col-md-6"
//                 label="Location"
//                 name="location"
//                 optional
//                 options={[anyState, ...getStates()]}
//                 placeholder="State"
//                 showFeedback={feedback.ERROR}
//               />
//             </div>
//             <div className="form-group">
//               <Button
//                 color="danger"
//                 loading={isSubmitting}
//                 onClick={handleSubmit}
//               >
//                 Filter Gallery
//               </Button>
//             </div>
//           </>
//         </Form>
//       )}
//     />
//   );
// };

// GalleryFilter.propTypes = {
//   setFilterTerms: PropTypes.func.isRequired,
// };

export default Gallery;
