import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import DuvLiveModal from 'components/custom/Modal';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { newBandMemberObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Input from 'components/forms/Input';
import AlertMessage from 'components/common/utils/AlertMessage';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { ENTERTAINER } from 'utils/constants';
import { navigate } from '@reach/router';
import LoadItems from 'components/common/utils/LoadItems';
import NoContent from 'components/common/utils/NoContent';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import Humanize from 'humanize-plus';

const BandMembers = () => {
  const { userState } = React.useContext(UserContext);

  if (userState.entertainerProfile.entertainerType !== ENTERTAINER.LIVEBAND) {
    navigate('/entertainer/dashboard');
  }

  const [bandMembers, setBandMembers] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/bandMembers', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setBandMembers(data.bandMembers);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setBandMembers([]);
      });
  }, []);

  const noOfBandMembers = (bandMembers || []).length;

  return (
    <BackEndPage title="Band Members">
      <div className="main-app">
        <section className="app-content">
          <div className="row mt-3 mb-2">
            <div className="col-sm-6">
              <h3 className="main-app__title">
                {`${noOfBandMembers} Band ${Humanize.pluralize(
                  noOfBandMembers,
                  'Member'
                )}`}
              </h3>
            </div>
            <div className="col-sm-6">
              <div className="text-right">
                <DuvLiveModal
                  body={<InviteTeamMemberForm />}
                  closeModalText="Cancel"
                  title="Invite Team Member"
                >
                  <button className="btn btn-transparent btn-danger">
                    <strong>+</strong> &nbsp; Invite Team Member
                  </button>
                </DuvLiveModal>
              </div>
            </div>
          </div>
          <LoadItems
            items={bandMembers}
            loadingText="Loading your Band Members"
            noContent={<NoContent isButton text="No Band Member found" />}
          >
            <BandMembersTable bandMembers={bandMembers || []} />
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const BandMembersTable = ({ bandMembers }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {bandMembers.map((bandMember, index) => (
          <BandMembersRow key={index} number={index + 1} {...bandMember} />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

BandMembersTable.propTypes = {
  bandMembers: PropTypes.array.isRequired,
};

const BandMembersRow = ({
  number,
  email,
  firstName,
  lastName,
  bandRole,
  profileImageURL,
  isActive,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {number}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={firstName + number}
        responsiveImage={false}
        src={profileImageURL || ProfileAvatar}
      />
    </td>
    <td className="align-middle">
      <span className="table__title">
        {firstName} {lastName}
      </span>
    </td>

    <td className="align-middle">
      <span className="table__title">{email}</span>
    </td>

    <td className="align-middle text-left">
      <span className="text-white">{bandRole}</span>
    </td>

    <td className="align-middle">
      {isActive ? (
        <span className="text-green text-uppercase">
          {' '}
          <i className="icon icon-ok-circled"></i> Verified{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-help"></i> Not Verified{' '}
        </span>
      )}
    </td>
    <td className=" align-middle text-right">
      <button className="btn btn-info btn-transparent">Change Role</button>{' '}
      &nbsp; &nbsp;&nbsp;
      <span className="icon icon-cancel"></span>
    </td>
  </tr>
);

BandMembersRow.defaultProps = {
  profileImageURL: '',
};

BandMembersRow.propTypes = {
  bandRole: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string,
};

const InviteTeamMemberForm = () => {
  const [message, setMessage] = React.useState({});

  return (
    <Formik
      initialValues={setInitialValues(newBandMemberObject)}
      onSubmit={(values, actions) => {
        axios
          .post(`/api/v1/new/bandMember`, values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              setMessage({
                msg: 'An invite has been sent to your member',
                type: 'success',
              });
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            console.log('error ', error.response.data.message);
            setMessage({ msg: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <>
          <Form>
            <AlertMessage
              message={message && message.msg}
              type={message && message.type}
            />

            <div className="form-row">
              <Input
                formGroupClassName="col-md-6"
                isValidMessage="First Name looks good"
                label="First Name"
                name="firstName"
                placeholder="First Name"
              />
              <Input
                formGroupClassName="col-md-6"
                isValidMessage="Last Name looks good"
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <Input
              isValidMessage="Email address seems valid"
              label="Email"
              name="email"
              placeholder="Email Address"
            />
            <Input
              isValidMessage="Phone number looks good"
              label="Role"
              name="bandRole"
              placeholder="Band Role (E.g Vocalist, Lead Singer, Drummer e.t.c)"
            />

            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Invite Member
            </Button>
          </Form>
        </>
      )}
      validationSchema={createSchema(newBandMemberObject)}
    />
  );
};

export default BandMembers;
