import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';
import { Row } from 'reactstrap';

const RecommendedEntertainers = ({ event_type }) => {
  return (
    <BackEndPage title="Recommended Entertainers">
      <div className="main-app">
        <TopMessage message="Recommended Entertainers" />

        <section className="app-content">
          <Row>
            <EntertainersSearchResult col={12} />
          </Row>
        </section>
      </div>
    </BackEndPage>
  );
};

RecommendedEntertainers.propTypes = {
  event_type: PropTypes.string
};

RecommendedEntertainers.defaultProps = {
  event_type: ''
};

export default RecommendedEntertainers;
