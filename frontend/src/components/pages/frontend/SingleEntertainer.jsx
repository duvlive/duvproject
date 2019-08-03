import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Entertainers from 'components/common/entertainers/Entertainers';
import entertainerLists from 'data/entertainers.js';
import { getSlug, getRelatedEntertainers } from 'utils/helpers';

const SingleEntertainer = ({ slug }) => {
  const entertainer = getSlug(entertainerLists, slug);
  const otherEntertainers = getRelatedEntertainers(
    entertainerLists,
    slug,
    entertainer.type
  );
  return (
    <FrontEndPage subtitle="Hire Entertainers" title={entertainer.stage_name}>
      <EntertainerSection entertainer={entertainer} />
      <OtherEntertainersSection entertainers={otherEntertainers.slice(0, 3)} />
      <BackToHireEntertainers />
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
            alt={entertainer.stage_name}
            className="img-fluid img-thumbnail img-entertainer"
            src={entertainer.img.profile}
          />
        </Col>
        <Col sm="9">
          <section className="entertainer__summary">
            <h2 className="entertainer__summary--title">
              {entertainer.stage_name}
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
              Hire {entertainer.stage_name}
            </button>
          </section>
        </Col>
      </Row>
    </div>
  </section>
);

EntertainerSection.propTypes = {
  entertainers: PropTypes.object.isRequired
};

const OtherEntertainersSection = ({ entertainers }) => (
  <section className="other-entertainers spacer">
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

const BackToHireEntertainers = () => (
  <section className="mt-">
    <div className="container-fluid">
      <button className="btn btn-info btn-transparent btn-lg" type="submit">
        Back to Hire Entertainers
      </button>
    </div>
  </section>
);

export default SingleEntertainer;
