import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import NoContent from 'components/common/utils/NoContent';
import Humanize from 'humanize-plus';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import AlertMessage from '../utils/AlertMessage';

const AdminList = ({
  apiData,
  pageName,
  apiUrl,
  limit,
  pluralPageName,
  showAll,
  tableRow,
  AddNewComponent,
  FilterComponent,
  OtherContentComponent,
}) => {
  const [message, setMessage] = React.useState(null);
  const inActiveData = { result: null, pagination: {} };
  const [data, setData] = React.useState(inActiveData);
  const [currPage, setCurrPage] = React.useState(0);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [filter, setFilter] = React.useState({});
  const [filterInWords, setFilterInWords] = React.useState({});

  const setFilterTerms = (terms, filterInWords) => {
    setFilter(terms);
    setFilterInWords(filterInWords);
    setOpenFilter(false);
  };

  const removeFilterTerm = (property) => {
    setFilter({ ...filter, [property]: null });
    setFilterInWords({ ...filterInWords, [property]: null });
    setOpenFilter(false);
  };

  const addData = (newData) => {
    setOpenNew(false);
    setData({
      ...data,
      result: [newData, ...data.result],
      pagination: { ...data.pagination, total: data.pagination.total + 1 },
    });
  };
  React.useEffect(() => {
    axios
      .get(apiUrl, {
        params: { offset: currPage * limit, limit, showAll, ...filter },
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
  }, [currPage, apiUrl, limit, showAll, filter]);

  const noOfResults = data.pagination.total || 0;
  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const currentFilters = () => {
    if (Object.keys(filter).length === 0)
      return (
        <button className="btn badge badge-filters">No Filter applied</button>
      );
    let output = [];
    for (let item in filter) {
      if (
        filter[item] &&
        Object.prototype.hasOwnProperty.call(filter, item) &&
        filter[item] !== JSON.stringify('')
      ) {
        output.push(
          <button className="btn badge badge-filters" key={item}>
            {filterInWords[item] || filter[item]}{' '}
            <span
              className="icon icon-cancel"
              onClick={() => removeFilterTerm(item)}
            ></span>
          </button>
        );
      }
    }
    return output;
  };

  const TOP_FILTER = (
    <>
      <div className="row mt-3 mb-2">
        <div className="col-sm-12">
          <div className="text-right">
            {AddNewComponent && (
              <p
                className="d-inline-block add-new-text"
                onClick={() => {
                  setOpenFilter(false);
                  setOpenNew(!openNew);
                }}
              >
                <span className="icon icon-plus"></span> &nbsp;{' '}
                {openNew ? `- Close New ${pageName} ` : `+ Add New ${pageName}`}
              </p>
            )}
            {FilterComponent && (
              <p
                className="d-inline-block filter-text"
                onClick={() => {
                  setOpenNew(false);
                  setOpenFilter((openFilter) => !openFilter);
                }}
              >
                <span className="icon icon-align-justify"></span> &nbsp;
                {openFilter ? 'Close Filter' : 'Set Filter'}
              </p>
            )}
          </div>
          <h3 className="main-app__title">
            {`${noOfResults} ${pluralizePageName}`}
            <br />
            {FilterComponent && (
              <small className="small--2 text-muted mt-3 d-block">
                {currentFilters()}
              </small>
            )}
          </h3>
        </div>
      </div>

      <SlideDown className={''}>
        {openFilter && <FilterComponent setFilterTerms={setFilterTerms} />}
        {openNew && (
          <AddNewComponent addData={addData} setMessage={setMessage} />
        )}
      </SlideDown>
    </>
  );

  return (
    <div className="main-app">
      <section className="app-content">
        <LoadItems
          items={data[apiData]}
          loadingText={`Loading ${pluralizePageName}`}
          noContent={
            <>
              {TOP_FILTER}
              <NoContent isButton text={`No ${pluralizePageName} found`} />
              {OtherContentComponent && (
                <OtherContentComponent showAll={showAll} />
              )}
            </>
          }
        >
          {TOP_FILTER}

          <AlertMessage {...message} />

          <ResultsTable
            offset={data.pagination.offset || 0}
            results={data[apiData] || []}
            Row={tableRow}
            setMessage={(options) => {
              setMessage(options);
              setFilter({ ...filter, [new Date().toISOString()]: null }); //force reload
            }}
          />
          {OtherContentComponent && <OtherContentComponent showAll={showAll} />}
          <div className="text-right">
            {data.pagination.totalPage > 1 && (
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
            )}
          </div>
        </LoadItems>
      </section>
    </div>
  );
};

AdminList.propTypes = {
  AddNewComponent: PropTypes.any,
  FilterComponent: PropTypes.any,
  OtherContentComponent: PropTypes.any,
  apiData: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  limit: PropTypes.number,
  pageName: PropTypes.string.isRequired,
  pluralPageName: PropTypes.string,
  showAll: PropTypes.any,
  tableRow: PropTypes.any.isRequired,
};

AdminList.defaultProps = {
  FilterComponent: null,
  AddNewComponent: null,
  OtherContentComponent: null,
  pluralPageName: null,
  showAll: null,
  limit: 10,
};

const ResultsTable = ({ results, offset, Row, setMessage }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {results.map((result, index) => (
          <Row
            key={index}
            number={parseInt(offset, 10) + index + 1}
            setMessage={setMessage}
            {...result}
          />
        ))}
      </tbody>
    </table>
    <br />
  </div>
);

ResultsTable.propTypes = {
  Row: PropTypes.any.isRequired,
  offset: PropTypes.any.isRequired,
  results: PropTypes.array.isRequired,
  setMessage: PropTypes.func,
};

ResultsTable.defaultProps = {
  setMessage: () => {},
};

export default AdminList;
