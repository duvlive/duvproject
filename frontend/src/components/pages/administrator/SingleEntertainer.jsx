import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import Badges from 'components/pages/entertainer/Badges';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
// import Button from 'components/forms/Button';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getTokenFromStore } from 'utils/localStorage';
import {
  EntertainerSectionInfo,
  Gallery,
  Videos,
  ReviewSection,
  InfoList,
} from 'components/pages/frontend/SingleEntertainer';
import AlertMessage from 'components/common/utils/AlertMessage';
import Button from 'components/forms/Button';
import NoContent from 'components/common/utils/NoContent';
import DuvLiveModal from 'components/custom/Modal';
import TextArea from 'components/forms/TextArea';
import {
  setInitialValues,
  // DisplayFormikState,
} from 'components/forms/form-helper';
import { entertainerCommentSchema } from 'components/forms/schema/entertainerSchema';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { useBadgesSelect, useCommissionSelect } from 'utils/useHooks';
import Select from 'components/forms/Select';
import { assignBadgeObject } from 'components/forms/schema/badgeSchema';
import { assignCommissionObject } from 'components/forms/schema/commissionSchema';
import { UserContext } from 'context/UserContext';

const SingleEntertainer = ({ id }) => {
  const [entertainer, setEntertainer] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/v1/admin/entertainer/${id}`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setEntertainer(data.entertainer);
        }
      })
      .catch(function (error) {
        setEntertainer({});
      });
  }, [id]);

  return (
    <BackEndPage title="Manage Entertainer">
      <div className="main-app">
        <TopMessage message="Entertainer Profile" />
        <section className="app-content">
          {entertainer && !entertainer.firstName ? (
            <NoContent isButton text="Entertainer Not Found" />
          ) : (
            <>
              {entertainer && <EntertainerProfile entertainer={entertainer} />}
              {entertainer && entertainer.profile && (
                <ApprovedEntertainerInfo entertainer={entertainer} />
              )}
            </>
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

SingleEntertainer.propTypes = {
  id: PropTypes.any,
};
SingleEntertainer.defaultProps = {
  id: '',
};

const EntertainerProfile = ({ entertainer }) => (
  <section>
    <EntertainerSection entertainer={entertainer} />
  </section>
);
EntertainerProfile.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const ApprovedEntertainerInfo = ({ entertainer }) => (
  <section>
    <div className="mt-5">
      <DuvLiveModal
        body={<AssignBadgeToUser userId={entertainer.id} />}
        closeModalText="Cancel"
        title="Assign Badge"
      >
        <button className="btn btn-transparent btn-danger">
          <strong>+</strong> &nbsp; Assign Badge
        </button>
      </DuvLiveModal>
      &nbsp; &nbsp;
      <DuvLiveModal
        body={<AssignCommissionToUser userId={entertainer.id} />}
        closeModalText="Cancel"
        title="Assign Commission"
      >
        <button className="btn btn-transparent btn-info">
          <strong>+</strong> &nbsp; Assign Commission
        </button>
      </DuvLiveModal>
    </div>

    {/* Show commission only when available */}
    {entertainer && entertainer.userCommission && (
      <section className="mt-5">
        <div className="w-100 card card-custom card-green p-4">
          <h5 className="font-weight-normal">
            <span className="icon icon-money"></span> Commission:{' '}
            {entertainer.userCommission.title}.
          </h5>
        </div>
      </section>
    )}

    <div className="mt-5">
      <EntertainerTab entertainer={entertainer} />
    </div>

    <div className="mt-5">
      <MediaTab entertainer={entertainer} />
    </div>
  </section>
);

ApprovedEntertainerInfo.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

export const EntertainerSection = ({ entertainer }) => (
  <Row>
    <Col sm="12">
      <Image
        bordered
        className="avatar--large float-left mr-3"
        name={entertainer.firstName || 'No name'}
        rounded={false}
        src={entertainer.profileImageURL || ProfileAvatar}
      />
      <section className="entertainer__summary">
        <h4 className="text-capitalize">
          {(entertainer.profile && entertainer.profile.stageName) ||
            `${entertainer.firstName} ${entertainer.lastName}`}
        </h4>
        <div className="text-red">
          {(entertainer.profile && entertainer.profile.entertainerType) ||
            'NONE'}
        </div>
        <article>
          {(entertainer.profile && entertainer.profile.about) || '-'}
        </article>
      </section>
    </Col>
  </Row>
);

EntertainerSection.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const Awards = ({ badges }) => (
  <div className="row mt-5">
    <h4 className="text-uppercase col-12 font-weight-normal mb-3">Awards</h4>
    <Badges.CardLists badges={badges} />
  </div>
);

Awards.propTypes = {
  badges: PropTypes.array.isRequired,
};

const BankDetails = ({ entertainer }) => (
  <div className="row">
    <Col sm={12}>
      <InfoList title="Account Number">
        {entertainer.bankDetail.accountNumber}
      </InfoList>
      <InfoList title="Account Name">
        {entertainer.bankDetail.accountName}
        {entertainer.approvalComment['bankAccount'] !== 'YES' && (
          <div className="small-text">
            {entertainer.firstName} {entertainer.lastName} (
            {entertainer.profile.entertainerType}{' '}
            {entertainer.profile.stageName})
          </div>
        )}
      </InfoList>

      <InfoList title="Bank">{entertainer.bankDetail.bankName}</InfoList>
    </Col>
  </div>
);

BankDetails.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const YouTubeChannel = ({ profile }) => (
  <div className="row">
    <Col sm={12}>
      <InfoList title="Channel">{profile.youTubeChannel}</InfoList>
    </Col>
  </div>
);

YouTubeChannel.propTypes = {
  profile: PropTypes.object.isRequired,
};

const ContactDetails = ({ contacts }) =>
  contacts.map((contact) => (
    <div className="row mt-5">
      <Col sm={12}>
        <Row>
          <Col md={4} sm={6}>
            <InfoList title="First Name">{contact.firstName}</InfoList>
          </Col>
          <Col md={4} sm={6}>
            <InfoList title="Last Name">{contact.lastName}</InfoList>
          </Col>
        </Row>
      </Col>

      <Col sm={12}>
        <Row>
          <Col md={4} sm={6}>
            <InfoList title="Phone Number">{contact.phoneNumber}</InfoList>
          </Col>
          <Col md={6} sm={6}>
            <InfoList title="Email">{contact.email}</InfoList>
          </Col>
        </Row>
      </Col>

      <Col sm={12}>
        <Row>
          <Col md={4} sm={6}>
            <InfoList title="Relationship">{contact.relationship}</InfoList>
          </Col>
          <Col md={4} sm={6}>
            <InfoList title="Type">
              {contact.type === 2 ? 'Professional' : 'Next of Kin'}
            </InfoList>
          </Col>
        </Row>
      </Col>
    </div>
  ));

ContactDetails.propTypes = {
  contacts: PropTypes.array.isRequired,
};

const Identification = ({ identification }) => (
  <div className="row">
    <Col sm={12}>
      <Row>
        <Col md={4} sm={6}>
          <InfoList title="ID Number">{identification.idNumber}</InfoList>
        </Col>
        <Col md={4} sm={6}>
          <InfoList title="Type">{identification.idType}</InfoList>
        </Col>
      </Row>
    </Col>

    <Col sm={12}>
      <Row>
        <Col md={4} sm={6}>
          <InfoList title="Issue Date">{identification.issueDate}</InfoList>
        </Col>
        <Col md={6} sm={6}>
          <InfoList title="Expiry Date">{identification.expiryDate}</InfoList>
        </Col>
      </Row>
    </Col>
  </div>
);

Identification.propTypes = {
  identification: PropTypes.object.isRequired,
};

const ENTERTAINER_TAB_LIST = [
  {
    id: 'entertainerProfile',
    name: 'Profile',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Profile</h4>
        <EntertainerSectionInfo entertainer={entertainer} showContentOnly />
      </>
    ),
    completed: (entertainer) =>
      entertainer.profileImageURL && entertainer.profile.stageName,
  },
  {
    id: 'bankAccount',
    name: 'Bank Details',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Bank Details</h4>
        <BankDetails entertainer={entertainer} />
      </>
    ),
    completed: (entertainer) => !!entertainer.bankDetail.accountName,
  },
  {
    id: 'contact',
    name: 'Contact Details',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Contact Details</h4>
        <ContactDetails contacts={entertainer.contacts} />
      </>
    ),
    completed: (entertainer) =>
      entertainer.contacts[0] && !!entertainer.contacts[0].email,
  },
  {
    id: 'youTube',
    name: 'Youtube Channel',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Youtube Channel</h4>
        <YouTubeChannel profile={entertainer.profile} />{' '}
      </>
    ),
    completed: (entertainer) => !!entertainer.profile.youTubeChannel,
  },
  {
    id: 'identification',
    name: 'Identification',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Identification</h4>
        <Identification identification={entertainer.identification} />
      </>
    ),
    completed: (entertainer) => !!entertainer.identification.idNumber,
  },
];

const EntertainerTab = ({ entertainer }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [forceClose, setForceClose] = React.useState(false);
  const [currentEntertainer, setCurrentEntertainer] = React.useState(
    entertainer
  );

  const addSingleComment = (userId, comments) => {
    console.log('userId, comments', userId, comments);
    axios
      .put(
        '/api/v1/approveEntertainer',
        { userId, ...comments },
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          setForceClose(true);
          setCurrentEntertainer({
            ...currentEntertainer,
            approvalComment: {
              ...currentEntertainer.approvalComment,
              ...comments,
            },
          });
          setMessage({
            type: 'success',
            message: `Your comment has been successfully submitted`,
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

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const ApprovalButton = ({ entertainer }) => {
    // Entertainer is already approved
    if (
      entertainer.approvalComment['entertainerProfile'] === 'YES' &&
      entertainer.approvalComment['bankAccount'] === 'YES' &&
      entertainer.approvalComment['contact'] === 'YES' &&
      entertainer.approvalComment['youTube'] === 'YES' &&
      entertainer.approvalComment['identification'] === 'YES'
    ) {
      return null;
    }

    console.log('ENTERTAIENR_TAB_LIST', ENTERTAINER_TAB_LIST);

    // Show button only when entertainer has completed all sections
    if (
      !(
        ENTERTAINER_TAB_LIST[0].completed(entertainer) &&
        ENTERTAINER_TAB_LIST[1].completed(entertainer) &&
        ENTERTAINER_TAB_LIST[2].completed(entertainer) &&
        ENTERTAINER_TAB_LIST[3].completed(entertainer) &&
        ENTERTAINER_TAB_LIST[4].completed(entertainer)
      )
    ) {
      return null;
    }

    return (
      <div className="my-5">
        <DuvLiveModal
          actionButtonColor="btn btn-danger btn-wide btn-transparent"
          actionFn={() =>
            addSingleComment(currentEntertainer.id, {
              entertainerProfile: 'YES',
              bankAccount: 'YES',
              contact: 'YES',
              youTube: 'YES',
              identification: 'YES',
            })
          }
          actionText="Yes, I am 100% Sure"
          body={
            <>
              <h5>Are you sure you have verified all entertainer details</h5>
              <p className="text-muted-light-2">
                This will approve all the entertainer account
              </p>
            </>
          }
          cancelButtonColor="btn btn-sm btn-transparent btn-info"
        >
          <button className="btn btn-danger btn-wide btn-transparent">
            Approve Entertainer
          </button>
        </DuvLiveModal>
      </div>
    );
  };

  return (
    <div>
      <AlertMessage {...message} />
      <ApprovalButton entertainer={entertainer} />
      <Nav tabs>
        {ENTERTAINER_TAB_LIST.map((tab, index) => (
          <NavItem key={index}>
            <NavLink
              className={classnames({ active: activeTab === index })}
              onClick={() => {
                toggle(index);
              }}
            >
              {tab.name}{' '}
              {currentEntertainer.approvalComment[tab.id] === 'YES' ? (
                <span className="icon icon-ok-circled"></span>
              ) : tab.completed(currentEntertainer) ? (
                <span className="icon icon-help "></span>
              ) : (
                <span className="icon icon-cancel-circled "></span>
              )}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {ENTERTAINER_TAB_LIST.map((tab, index) => (
          <TabPane key={index} tabId={index}>
            <Row>
              <Col sm="12">{tab.content(currentEntertainer)}</Col>
              {currentEntertainer.approvalComment[tab.id] === 'YES' ? (
                <h4 className="text-success">
                  <span className="icon icon-ok-circled"></span> Approved
                </h4>
              ) : (
                tab.completed(currentEntertainer) && (
                  <>
                    {currentEntertainer.approvalComment[tab.id] && (
                      <div className="col-sm-12 tab-bg-info">
                        <h6>Comment</h6>
                        <p className="text-muted-light">
                          {currentEntertainer.approvalComment[tab.id]}
                        </p>
                      </div>
                    )}
                    <Button
                      className="btn btn-danger btn-wide btn-transparent"
                      onClick={() =>
                        addSingleComment(currentEntertainer.id, {
                          [tab.id]: 'YES',
                        })
                      }
                    >
                      Approve {tab.name}
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <DuvLiveModal
                      beforeModalOpen={() => setForceClose(false)}
                      body={
                        <AddCommentsForm
                          addSingleComment={addSingleComment}
                          entertainerId={currentEntertainer.id}
                          name={tab.name}
                          tabId={tab.id}
                        />
                      }
                      closeModalText="Cancel"
                      forceCloseModal={forceClose}
                      title="Add Comments"
                    >
                      <button className="btn btn-info btn-wide btn-transparent">
                        Add Comment
                      </button>
                    </DuvLiveModal>
                  </>
                )
              )}
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

EntertainerTab.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const MediaTab = ({ entertainer }) => {
  const [activeTab, setActiveTab] = React.useState('1');
  console.log('entertainer', entertainer);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Gallery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Videos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Awards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Reviews
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {entertainer.galleries && entertainer.galleries.length > 0 ? (
                <>
                  <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
                    Gallery
                  </h4>
                  <Gallery galleries={entertainer.galleries} showContentOnly />
                </>
              ) : (
                <div className="text-center mt-5">
                  <span className="icon icon-gallery display-1"></span>
                  <NoContent text="Entertainer has no gallery" />
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              {entertainer.videos && entertainer.videos.length > 0 ? (
                <>
                  <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
                    Videos
                  </h4>
                  <Videos showContentOnly videos={entertainer.videos} />
                </>
              ) : (
                <div className="text-center mt-5">
                  <span className="icon icon-video display-1"></span>
                  <NoContent text="Entertainer has no videos" />
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              {entertainer.badges && entertainer.badges.length > 0 ? (
                <Awards badges={entertainer.badges} />
              ) : (
                <div className="text-center mt-5">
                  <span className="icon icon-badge display-1"></span>
                  <NoContent text="Entertainer has no Awards" />
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              {entertainer.profile &&
              entertainer.profile.ratings &&
              entertainer.profile.ratings.length > 0 ? (
                <ReviewSection ratings={entertainer.profile.ratings} />
              ) : (
                <div className="text-center mt-5">
                  <span className="icon icon-vcard display-1"></span>
                  <NoContent text="Entertainer has no Reviews" />
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

MediaTab.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const AddCommentsForm = ({ addSingleComment, entertainerId, name, tabId }) => (
  <Formik
    initialValues={setInitialValues(entertainerCommentSchema)}
    onSubmit={({ comments }) => {
      addSingleComment(entertainerId, { [tabId]: comments });
    }}
    render={({ isSubmitting, handleSubmit }) => (
      <>
        <Form>
          <TextArea
            label="Comment"
            name="comments"
            placeholder="Reason for rejecting application"
            rows="2"
          />

          <Button
            className="btn-info btn-wide btn-transparent mt-2"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Reject {name}
          </Button>
        </Form>
      </>
    )}
    validationSchema={createSchema(entertainerCommentSchema)}
  />
);

AddCommentsForm.propTypes = {
  addSingleComment: PropTypes.func.isRequired,
  entertainerId: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
};

const AssignCommissionToUser = ({ userId }) => {
  const commissions = useCommissionSelect();
  const [message, setMessage] = React.useState({});
  let { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      initialValues={setInitialValues(assignCommissionObject)}
      onSubmit={({ commissionId }, actions) => {
        axios
          .post(
            `/api/v1/assign-commission-to-user`,
            { commissionId, userId },
            {
              headers: { 'x-access-token': getTokenFromStore() },
            }
          )
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              setMessage({
                msg: 'Commision has been successfully assigned to user',
                type: 'success',
              });
              userDispatch({
                type: 'add-user-commission',
                commission: data.commission,
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
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <Form>
            <AlertMessage
              message={message && message.msg}
              type={message && message.type}
            />
            <Select
              blankOption="Commissions"
              label="Select Commissions"
              name="commissionId"
              options={commissions}
              placeholder="Select Commission"
            />

            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Assign Commission
            </Button>
          </Form>
        </>
      )}
      validationSchema={createSchema(assignCommissionObject)}
    />
  );
};

AssignCommissionToUser.propTypes = {
  userId: PropTypes.any.isRequired,
};

const AssignBadgeToUser = ({ userId }) => {
  const badges = useBadgesSelect();
  const [message, setMessage] = React.useState({});

  return (
    <Formik
      initialValues={setInitialValues(assignBadgeObject)}
      onSubmit={({ badgeId }, actions) => {
        axios
          .post(
            `/api/v1/badge/assign`,
            { badgeId, userId },
            {
              headers: { 'x-access-token': getTokenFromStore() },
            }
          )
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              setMessage({
                msg: 'Badge has been successfully assigned to user',
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
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <Form>
            <AlertMessage
              message={message && message.msg}
              type={message && message.type}
            />
            <Select
              blankOption="Badges"
              label="Select Badge"
              name="badgeId"
              options={badges}
              placeholder="Select Bagde"
            />

            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Assign Badge
            </Button>
          </Form>
        </>
      )}
      validationSchema={createSchema(assignBadgeObject)}
    />
  );
};

AssignBadgeToUser.propTypes = {
  userId: PropTypes.any.isRequired,
};

export default SingleEntertainer;
