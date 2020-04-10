import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import FilterEntertainerFields from 'components/common/entertainers/FilterEntertainerFields';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';
import { Row } from 'reactstrap';

const SearchEntertainer = ({ eventEntertainerId }) => {
  return (
    <BackEndPage title="Recommend Entertainer">
      <div className="main-app">
        <TopMessage message="Recommend Entertainer" />

        <section className="app-content">
          <Row>
            <FilterEntertainerFields />
            <EntertainersSearchResult entertainers={[]} isSearchForm={true} />
          </Row>
        </section>
      </div>
    </BackEndPage>
  );
};

SearchEntertainer.propTypes = {
  eventEntertainerId: PropTypes.string,
};

SearchEntertainer.defaultProps = {
  eventEntertainerId: '',
};

export default SearchEntertainer;
