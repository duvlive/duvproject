import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Entertainers from 'components/common/entertainers/Entertainers';
import Stars from 'components/common/utils/Stars';
import AwardCard from 'components/common/utils/AwardCard';
import Image from 'components/common/utils/Image';
import Video from 'components/pages/entertainer/Video';
import DuvLiveModal from 'components/custom/Modal';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { commaNumber } from 'utils/helpers';
import { getYear } from 'utils/date-helpers';

const SingleEntertainer = ({ slug }) => {
  const [entertainer, setEntertainer] = React.useState({
    profile: { stageName: slug },
  });
  const [otherEntertainers, setOtherEntertainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    slug &&
      axios.get(`/api/v1/entertainer/${slug}`).then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEntertainer(data.entertainer);
          setOtherEntertainers(data.otherEntertainers);
          console.log('data.entertainer: ', data.entertainer);
          setLoading(false);
        }
      });
  }, [slug]);

  return (
    <FrontEndPage
      subtitle="Hire Entertainers"
      title={entertainer.profile.stageName}
    >
      {loading ? (
        <LoadingScreen loading={loading} text={`Loading ${slug} information`} />
      ) : (
        <LoadEntertainerInfo
          entertainer={entertainer}
          otherEntertainers={otherEntertainers}
        />
      )}
    </FrontEndPage>
  );
};

SingleEntertainer.propTypes = {
  slug: PropTypes.string,
};

SingleEntertainer.defaultProps = {
  slug: null,
};

const LoadEntertainerInfo = ({ entertainer, otherEntertainers }) => (
  <>
    <EntertainerSection entertainer={entertainer} />
    {getTokenFromStore() && (
      <>
        <EntertainerSectionInfo entertainer={entertainer} />
        {false && <UpcomingEvents />}
        <Awards entertainer={entertainer.awards || []} />
        <Gallery entertainer={entertainer.galleries} />
        <Videos entertainer={entertainer.videos} />
      </>
    )}
    <OtherEntertainersSection entertainers={otherEntertainers} />
  </>
);

LoadEntertainerInfo.propTypes = {
  entertainer: PropTypes.object.isRequired,
  otherEntertainers: PropTypes.array.isRequired,
};

const EntertainerSection = ({ entertainer }) => (
  <section className="single-entertainer">
    <div className="container-fluid">
      <Row>
        <Col sm="3">
          <img
            alt={entertainer.stageName}
            className="img-fluid img-thumbnail img-entertainer"
            src={entertainer.profileImageURL}
          />
        </Col>
        <Col sm="9">
          <section className="entertainer__summary">
            <h2 className="entertainer__summary--title">
              {entertainer.profile.stageName}
            </h2>
            <div className="text-danger">
              {entertainer.profile.entertainerType}
            </div>
            <section className="entertainer__summary--content">
              <div className="row">
                <div className="col-sm-9">{entertainer.profile.about}</div>
              </div>
            </section>
            <button
              className="btn btn-danger btn-transparent btn-lg"
              type="submit"
            >
              Hire {entertainer.profile.stageName}
            </button>
          </section>
        </Col>
      </Row>
    </div>
  </section>
);

EntertainerSection.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const EntertainerSectionInfo = ({ entertainer }) => (
  <section
    className={`entertainer-info ${entertainer.profile.entertainerType.toLowerCase()} mt-5`}
  >
    <div className="container-fluid">
      <Row>
        <h4 className="text-uppercase col-12 font-weight-normal mb-5">
          Information
        </h4>
        <Col sm="4">
          <InfoList title="Stage Name">
            {entertainer.profile.stageName}
          </InfoList>
          <InfoList title="Speciality">
            {entertainer.profile.entertainerType}
          </InfoList>
          <InfoList title="Years of Experience">
            {parseInt(getYear(Date.now()), 10) -
              parseInt(entertainer.profile.yearStarted, 10)}{' '}
            years
          </InfoList>
          {/* <InfoList title="Total Shows">
            {entertainer.total_shows} Shows
          </InfoList> */}
        </Col>
        <Col sm="4">
          <InfoList title="Member Since">
            {getYear(entertainer.profile.createdAt)}
          </InfoList>
          <InfoList title="Location"> {entertainer.profile.location}</InfoList>
          <InfoList title="Average Charges">
            {commaNumber(entertainer.profile.baseCharges)} -{' '}
            {commaNumber(entertainer.profile.preferredCharges)}
          </InfoList>
          <InfoList title="Willing to Travel for Shows">
            {entertainer.profile.willing_to_travel ? 'YES' : 'NO'}
          </InfoList>
        </Col>
        <Col sm="4">
          <InfoStar rating={4.5} title="Professionalism" />
          <InfoStar rating={4.5} title="Accommodating" />
          <InfoStar rating={4.5} title="Overall Talent" />
          <InfoStar rating={4} title="Recommend" />
        </Col>
      </Row>
    </div>
  </section>
);

EntertainerSectionInfo.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const UpcomingEvents = ({ events }) => {
  return (
    <section className="my-5 py-5">
      <div className="container-fluid">
        <div className="row">
          <h4 className="text-uppercase col-12 font-weight-normal mb-3">
            Upcoming Events
          </h4>
          <UpcomingEvent event={events} />
          <UpcomingEvent event={events} />
        </div>
      </div>
    </section>
  );
};

const UpcomingEvent = ({ event }) => (
  <aside className="col-md-6">
    <div className="table-responsive">
      <table className="table table-dark table__no-border table__with-bg">
        <tbody>
          <tr>
            <td className="pl-4">
              <span className="subtitle--2 text-red text-uppercase">
                APR. 11 (SUN) {event && event}
              </span>
              <span className="small--3 text-gray">9:00am - 4:00pm</span>
            </td>
            <td>
              <div className="table__title text-white">Wedding Ceremony</div>
              <span>
                <i className="icon icon-location" />
                Yaba, Lagos state
              </span>
            </td>
            <td>
              <span className="text-yellow">DJ, Live Band</span>
              <span>DJ Cuppy, High Soul</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </aside>
);

EntertainerSectionInfo.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

const InfoList = ({ title, children }) => (
  <div className="entertainer-info__list">
    <h6>{title}</h6>
    <h3>{children}</h3>
  </div>
);
InfoList.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

InfoList.defaultProps = {
  children: null,
};

const InfoStar = ({ title, rating }) => (
  <div className="entertainer-info__list">
    <h6>{title}</h6>
    <Stars name={title} rating={rating} />
  </div>
);

InfoStar.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const Awards = ({ awards }) => {
  return (
    <section className="my-5 py-5">
      <div className="container-fluid">
        <div className="row">
          <h4 className="text-uppercase col-12 font-weight-normal mb-3">
            Awards
          </h4>
          {/* <AwardCard
            color="yellow"
            date="Sun, April 17, 2019"
            title="Completed 20 Events"
          />
          <AwardCard
            color="white"
            date="Sun, April 17, 2019"
            title="Has over 10 five star ratings"
          />
          <AwardCard
            color="red"
            date="Sun, April 17, 2019"
            title="Completed over 10 Events"
          /> */}
          <AwardCard
            color="blue"
            date="Sun, April 17, 2019"
            title="DUV LIVE Certified Entertainer"
          />
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section className="my-5 py-5">
      <div className="container-fluid">
        <div className="row">
          <h4 className="text-uppercase col-12 font-weight-normal mb-3">
            Gallery
          </h4>
          {/* <GalleryImage name="gallery" src={DjCuppy1} /> */}
        </div>
      </div>
    </section>
  );
};

const GalleryImage = ({ name, src }) => (
  <div className="card col-lg-3 col-md-4 col-6 gallery-card-image">
    <DuvLiveModal
      body={
        <>
          <Image.Big
            className="img-fluid"
            name={name}
            rounded={false}
            src={src}
          />
        </>
      }
    >
      <Image
        bordered
        className="img-fluid small"
        name="gallery"
        rounded={false}
        src={src}
      />
    </DuvLiveModal>
  </div>
);

const Videos = () => {
  return (
    <section className="my-5 py-5">
      <div className="container-fluid">
        <div className="row">
          <h4 className="text-uppercase col-12 font-weight-normal mb-3">
            Videos
          </h4>
          {/* <YoutubeVideo title="Gelato" youtubeID="5ILiIQdUDV8" />
          <YoutubeVideo title="gallery" youtubeID="O4yp_KbkVLE" /> */}
        </div>
      </div>
    </section>
  );
};

const YoutubeVideo = ({ title, youtubeID }) => (
  <section className="d-block col-md-4 mb-4">
    <div className="card card__with-icon position-relative">
      <DuvLiveModal
        body={<Video.ModalCard title={title} youtubeID={youtubeID} />}
        className="modal-full"
        title={title}
      >
        <Video.YoutubeImage title={title} youtubeID={youtubeID} />
        <Video.YoutubeOverlay title={title} youtubeId={youtubeID} />
      </DuvLiveModal>
    </div>
  </section>
);

YoutubeVideo.propTypes = {
  title: PropTypes.string.isRequired,
  youtubeID: PropTypes.any.isRequired,
};

const OtherEntertainersSection = ({ entertainers }) => (
  <section className="other-entertainers mt-5 py-5">
    <div className="container-fluid">
      <h2 className="header title-border">
        RELATED <span>ENTERTAINERS</span>
      </h2>
      <Row className="pt-5">
        <Entertainers.List lists={entertainers || []} />
      </Row>
    </div>
  </section>
);

OtherEntertainersSection.propTypes = {
  entertainers: PropTypes.array.isRequired,
};

export default SingleEntertainer;
