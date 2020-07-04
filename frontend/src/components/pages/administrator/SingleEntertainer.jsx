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
import { setInitialValues } from 'components/forms/form-helper';
import { entertainerCommentSchema } from 'components/forms/schema/entertainerSchema';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schema/schema-helpers';

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
      <EntertainerTab entertainer={entertainer} />
    </div>

    {entertainer.badges && entertainer.badges.length > 0 && (
      <Awards badges={entertainer.badges} />
    )}

    {entertainer.galleries && entertainer.galleries.length > 0 && (
      <>
        <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
          Gallery
        </h4>
        <Gallery galleries={entertainer.galleries} showContentOnly />
      </>
    )}

    {entertainer.videos && entertainer.videos.length > 0 && (
      <>
        <h4 className="mt-5 text-uppercase col-12 font-weight-normal mb-3">
          Videos
        </h4>
        <Videos showContentOnly videos={entertainer.videos} />
      </>
    )}
    {entertainer.profile &&
      entertainer.profile.ratings &&
      entertainer.profile.ratings.length > 0 && (
        <ReviewSection ratings={entertainer.profile.ratings} />
      )}
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

const BankDetails = ({ bankDetail }) => (
  <div className="row">
    <Col sm={12}>
      <InfoList title="Account Number">{bankDetail.accountNumber}</InfoList>
      <InfoList title="Account Name">{bankDetail.accountName}</InfoList>
      <InfoList title="Bank">{bankDetail.bankName}</InfoList>
    </Col>
    {/* <Col lg={4} md={6} sm={12}>
    </Col> */}
  </div>
);

BankDetails.propTypes = {
  bankDetail: PropTypes.object.isRequired,
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
          <InfoList title="Expirt Date">{identification.expiryDate}</InfoList>
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
    completed: (entertainer) => entertainer.profileImageURL && entertainer.profile.stageName,
  },
  {
    id: 'bankAccount',
    name: 'Bank Details',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Bank Details</h4>
        <BankDetails bankDetail={entertainer.bankDetail} />
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
    completed: (entertainer) => entertainer.contacts[0] && !!entertainer.contacts[0].email,
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
  const [forceClose, setForceClose] = React.useState(false)

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
          // user dispatch the approved stuff
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

  return (
    <div>
      <AlertMessage {...message} />
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
              {entertainer.approvalComment[tab.id] === 'YES' ? (
                <span className="icon icon-ok-circled"></span>
              ) : tab.completed(entertainer) ? (
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
              <Col sm="12">{tab.content(entertainer)}</Col>
              {entertainer.approvalComment[tab.id] === 'YES' ? (
                <h4 className="text-success">
                  <span className="icon icon-ok-circled"></span> Approved
                </h4>
              ) : (
                  tab.completed(entertainer) && (
                    <>
                      {entertainer.approvalComment[tab.id] && <div className="row col-sm-12 mb-4">
                        <AlertMessage message={entertainer.approvalComment[tab.id]} type="info" />
                      </div>}
                      <Button
                        className="btn btn-danger btn-wide btn-transparent"
                        onClick={() =>
                          addSingleComment(entertainer.id, { [tab.id]: 'YES' })
                        }
                      >
                        Approve {tab.name}
                      </Button>
                        &nbsp;&nbsp;&nbsp;
                      <DuvLiveModal
                        beforeModalOpen={() => setForceClose(false)}
                        body={<AddCommentsForm addSingleComment={addSingleComment} entertainerId={entertainer.id} name={tab.name} tabId={tab.id} />}
                        closeModalText="Cancel"
                        forceCloseModal={forceClose}
                        title="Add Comments"
                      >
                        <button
                          className="btn btn-info btn-wide btn-transparent"
                        >
                          Reject {tab.name}
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

const AddCommentsForm = ({ addSingleComment, entertainerId, name, tabId }) => (
  <Formik
    initialValues={setInitialValues(entertainerCommentSchema)}
    onSubmit={({ comments }) => { addSingleComment(entertainerId, { [tabId]: comments }) }}
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

export default SingleEntertainer;
