import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import SearchEntertainerFields from 'components/common/entertainers/SearchEntertainerFields';
import EntertainersSearchResult from 'components/common/entertainers/EntertainersSearchResult';

const SearchEntertainer = ({ event_id }) => {
  console.log('event_id', event_id);
  return (
    <BackEndPage title="Search Entertainer">
      <div className="main-app">
        <TopMessage message="Search Entertainer" />

        <section className="app-content">
          <div className="row">
            <SearchEntertainerFields />
          </div>
          <EntertainersSearchResult cardsPerRow={3} col={12} />
        </section>
      </div>
    </BackEndPage>
  );
};

SearchEntertainer.defaultProps = {
  event_id: '0'
};

SearchEntertainer.propTypes = {
  event_id: PropTypes.string.isRequired
};

export default SearchEntertainer;
