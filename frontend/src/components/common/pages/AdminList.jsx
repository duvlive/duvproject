import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import NoContent from 'components/common/utils/NoContent';
import Humanize from 'humanize-plus';

const AdminList = ({ apiData, pageName, apiUrl, tableRow }) => {
  const inActiveData = { result: null, pagination: {} };
  const [data, setData] = React.useState(inActiveData);
  const [currPage, setCurrPage] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(apiUrl, {
        params: { offset: currPage },
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setData(data);
        }
      })
      .catch(function (error) {
        setData({ results: [], pagination: {} });
      });
  }, [currPage, apiUrl]);

  const noOfResults = data.pagination.total || 0;
  const pluralizePageName = Humanize.pluralize(2, pageName);

  return (
    <div className="main-app">
      <section className="app-content">
        <div className="row mt-3 mb-2">
          <div className="col-sm-6">
            <h3 className="main-app__title">
              {`${noOfResults} ${Humanize.pluralize(noOfResults, pageName)}`}
            </h3>
          </div>
        </div>
        <LoadItems
          items={data[apiData]}
          loadingText={`Loading ${pluralizePageName}`}
          noContent={
            <NoContent isButton text={`No ${pluralizePageName} found`} />
          }
        >
          <ResultsTable
            offset={data.pagination.offset || 0}
            results={data[apiData] || []}
            Row={tableRow}
          />
          <div className="text-right">
            <ReactPaginate
              activeClassName={'active'}
              breakClassName={'break-me'}
              breakLabel={'...'}
              containerClassName={'pagination'}
              marginPagesDisplayed={3} // ending point list
              nextLabel={'Next'}
              onPageChange={(data) => setCurrPage(data.selected)}
              pageCount={data.pagination.totalPage} // number of pages
              pageRangeDisplayed={3} // start point
              previousLabel={'Prev'}
              subContainerClassName={'page-item'}
            />
          </div>
        </LoadItems>
      </section>
    </div>
  );
};

AdminList.propTypes = {
  apiData: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tableRow: PropTypes.node.isRequired,
};

const ResultsTable = ({ results, offset, Row }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {results.map((result, index) => (
          <Row key={index} number={offset + index + 1} {...result} />
        ))}
      </tbody>
    </table>
    <br />
  </div>
);

ResultsTable.propTypes = {
  Row: PropTypes.node.isRequired,
  offset: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
};

export default AdminList;
