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
        setEntertainer([]);
      });
  }, [id]);

  return (
    <BackEndPage title="Manage Entertainer">
      <div className="main-app">
        <TopMessage message="Entertainer Profile" />
        <section className="app-content">
          {entertainer && <EntertainerProfile entertainer={entertainer} />}
          {entertainer &&
            entertainer.profile &&
            entertainer.profile.approved && (
              <ApprovedEntertainerInfo entertainer={entertainer} />
            )}
        </section>
      </div>
    </BackEndPage>
  );
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

SingleEntertainer.propTypes = {
  slug: PropTypes.any,
};
SingleEntertainer.defaultProps = {
  slug: '',
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
          {entertainer.profile.stageName ||
            `${entertainer.firstName} ${entertainer.lastName}`}
        </h4>
        <div className="text-red">
          {entertainer.profile.entertainerType || 'NONE'}
        </div>
        <article>{entertainer.profile.about || '-'}</article>
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
    name: 'Profile',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Profile</h4>
        <EntertainerSectionInfo entertainer={entertainer} showContentOnly />
      </>
    ),
  },
  {
    name: 'Bank Details',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Bank Details</h4>
        <BankDetails bankDetail={entertainer.bankDetail} />
      </>
    ),
  },
  {
    name: 'Contact Details',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Contact Details</h4>
        <ContactDetails contacts={entertainer.contacts} />
      </>
    ),
  },
  {
    name: 'Youtube Channel',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Youtube Channel</h4>
        <YouTubeChannel profile={entertainer.profile} />{' '}
      </>
    ),
  },
  {
    name: 'Identification',
    content: (entertainer) => (
      <>
        <h4 className="tab-header">Identification</h4>
        <Identification identification={entertainer.identification} />
      </>
    ),
  },
];

const EntertainerTab = ({ entertainer }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        {ENTERTAINER_TAB_LIST.map((tab, index) => (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === index })}
              onClick={() => {
                toggle(index);
              }}
            >
              {tab.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {ENTERTAINER_TAB_LIST.map((tab, index) => (
          <TabPane tabId={index}>
            <Row>
              <Col sm="12">{tab.content(entertainer)}</Col>
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
export default SingleEntertainer;
