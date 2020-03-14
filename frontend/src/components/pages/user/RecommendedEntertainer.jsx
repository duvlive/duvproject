import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import FilterEntertainerFields from 'components/common/entertainers/FilterEntertainerFields';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';
import { Row } from 'reactstrap';

const SearchEntertainer = ({ eventType }) => {
  return (
    <BackEndPage title="Recommend Entertainer">
      <div className="main-app">
        <TopMessage message="Recommend Entertainer" />

        <section className="app-content">
          <Row>
            <FilterEntertainerFields />
            <EntertainersSearchResult />
          </Row>
        </section>
      </div>
    </BackEndPage>
  );
};

SearchEntertainer.propTypes = {
  eventType: PropTypes.string
};

SearchEntertainer.defaultProps = {
  eventType: ''
};

export default SearchEntertainer;
