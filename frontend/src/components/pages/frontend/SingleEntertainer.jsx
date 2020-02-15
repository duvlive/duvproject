import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Entertainers from 'components/common/entertainers/Entertainers';
import entertainerLists from 'data/entertainers.js';
import { getSlug, getRelatedEntertainers } from 'utils/helpers';
import Stars from 'components/common/utils/Stars';
import AwardCard from 'components/common/utils/AwardCard';
import Image from 'components/common/utils/Image';
import Video from 'components/pages/entertainer/Video';

import DjCuppy1 from 'assets/img/gallery/DjCuppy1.jpg';
import DjCuppy2 from 'assets/img/gallery/DjCuppy2.jpg';
import DjCuppy3 from 'assets/img/gallery/DjCuppy3.jpg';
import DjCuppy4 from 'assets/img/gallery/DjCuppy4.jpg';
import DjCuppy5 from 'assets/img/gallery/DjCuppy5.jpg';
import DjCuppy6 from 'assets/img/gallery/DjCuppy6.jpg';
import DuvLiveModal from 'components/custom/Modal';
import { getTokenFromStore } from 'utils/localStorage';

const SingleEntertainer = ({ slug }) => {
  const entertainer = getSlug(entertainerLists, slug);
  const otherEntertainers = getRelatedEntertainers(
    entertainerLists,
    slug,
    entertainer.type
  );
  return (
    <FrontEndPage subtitle="Hire Entertainers" title={entertainer.stageName}>
      <EntertainerSection entertainer={entertainer} />
      {getTokenFromStore() && (
        <>
          <EntertainerSectionInfo entertainer={entertainer} />
          <UpcomingEvents />
          <Awards />
          <Gallery />
          <Videos />
        </>
      )}
      <OtherEntertainersSection entertainers={otherEntertainers.slice(0, 3)} />
    </FrontEndPage>
  );
};

SingleEntertainer.propTypes = {
  slug: PropTypes.string
};

SingleEntertainer.defaultProps = {
  slug: null
};

const EntertainerSection = ({ entertainer }) => (
  <section className="single-entertainer">
    <div className="container-fluid">
      <Row>
        <Col sm="3">
          <img
            alt={entertainer.stageName}
            className="img-fluid img-thumbnail img-entertainer"
            src={entertainer.img.profile}
          />
        </Col>
        <Col sm="9">
          <section className="entertainer__summary">
            <h2 className="entertainer__summary--title">
              {entertainer.stageName}
            </h2>
            <div className="text-danger">{entertainer.type}</div>
            <section className="entertainer__summary--content">
              <div className="row">
                <div className="col-sm-9">{entertainer.summary}</div>
              </div>
            </section>
            <button
              className="btn btn-danger btn-transparent btn-lg"
              type="submit"
            >
              Hire {entertainer.stageName}
            </button>
          </section>
        </Col>
      </Row>
    </div>
  </section>
);

EntertainerSection.propTypes = {
  entertainer: PropTypes.object.isRequired
};

const EntertainerSectionInfo = ({ entertainer }) => (
  <section
    className={`entertainer-info ${entertainer.type.toLowerCase()} mt-5`}
  >
    <div className="container-fluid">
      <Row>
        <h4 className="text-uppercase col-12 font-weight-normal mb-5">
          Information
        </h4>
        <Col sm="4">
          <InfoList title="Stage Name">{entertainer.stageName}</InfoList>
          <InfoList title="Speciality"> {entertainer.type} </InfoList>
          <InfoList title="Years of Experience">
            {entertainer.years_of_experience} years
          </InfoList>
          <InfoList title="Total Shows">
            {entertainer.total_shows} Shows
          </InfoList>
        </Col>
        <Col sm="4">
          <InfoList title="Member Since">{entertainer.registered}</InfoList>
          <InfoList title="Location"> {entertainer.location}</InfoList>
          <InfoList title="Average Charges">50,000 - 150,000</InfoList>
          <InfoList title="Willing to Travel for Shows">
            {entertainer.willing_to_travel}
          </InfoList>
        </Col>
        <Col sm="4">
          <InfoStar
            rating={entertainer.ratings.professionalism}
            title="Professionalism"
          />
          <InfoStar
            rating={entertainer.ratings.accomodating}
            title="Accommodating"
          />
          <InfoStar
            rating={entertainer.ratings.overall_talent}
            title="Overall Talent"
          />
          <InfoStar rating={entertainer.ratings.recommend} title="Recommend" />
        </Col>
      </Row>
    </div>
  </section>
);

EntertainerSectionInfo.propTypes = {
  entertainer: PropTypes.object.isRequired
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
  entertainer: PropTypes.object.isRequired
};

const InfoList = ({ title, children }) => (
  <div className="entertainer-info__list">
    <h6>{title}</h6>
    <h3>{children}</h3>
  </div>
);
InfoList.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired
};

InfoList.defaultProps = {
  children: null
};

const InfoStar = ({ title, rating }) => (
  <div className="entertainer-info__list">
    <h6>{title}</h6>
    <Stars name={title} rating={rating} />
  </div>
);

InfoStar.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const Awards = ({ awards }) => {
  return (
    <section className="my-5 py-5">
      <div className="container-fluid">
        <div className="row">
          <h4 className="text-uppercase col-12 font-weight-normal mb-3">
            Awards
          </h4>
          <AwardCard
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
          />
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
          <GalleryImage name="gallery" src={DjCuppy1} />
          <GalleryImage name="gallery" src={DjCuppy2} />
          <GalleryImage name="gallery" src={DjCuppy3} />
          <GalleryImage name="gallery" src={DjCuppy4} />
          <GalleryImage name="gallery" src={DjCuppy5} />
          <GalleryImage name="gallery" src={DjCuppy6} />
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
          <YoutubeVideo title="Gelato" youtubeID="5ILiIQdUDV8" />
          <YoutubeVideo title="gallery" youtubeID="O4yp_KbkVLE" />
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
  youtubeID: PropTypes.any.isRequired
};

const OtherEntertainersSection = ({ entertainers }) => (
  <section className="other-entertainers mt-5 py-5">
    <div className="container-fluid">
      <h2 className="header title-border">
        RELATED <span>ENTERTAINERS</span>
      </h2>
      <Row className="pt-5">
        <Entertainers.List lists={entertainers} />
      </Row>
    </div>
  </section>
);

OtherEntertainersSection.propTypes = {
  entertainers: PropTypes.array.isRequired
};

export default SingleEntertainer;
