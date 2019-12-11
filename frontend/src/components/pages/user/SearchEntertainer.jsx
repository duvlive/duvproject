import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import FilterEntertainerFields from 'components/common/entertainers/FilterEntertainerFields';

const SearchEntertainer = ({ event_type }) => {
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message="Search Entertainer" />

        <section className="app-content">
          <FilterEntertainerFields />
        </section>
      </div>
    </BackEndPage>
  );
};

SearchEntertainer.propTypes = {
  event_type: PropTypes.string
};

SearchEntertainer.defaultProps = {
  event_type: ''
};

export default SearchEntertainer;
