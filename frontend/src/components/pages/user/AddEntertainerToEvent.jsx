import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import { BUDGET, HIRE_ENTERTAINERS_TYPE } from 'utils/constants';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { UserContext } from 'context/UserContext';
import {
  getHiredEntertainerFromStore,
  getTokenFromStore,
  removeHiredEntertainerFromStore,
} from 'utils/localStorage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import AlertMessage from '../../common/utils/AlertMessage';
import BackEndPage from '../../common/layout/BackEndPage';
import TopMessage from '../../common/layout/TopMessage';
import { Row, Col } from 'reactstrap';
import Card from 'components/custom/Card';
import { getLongDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import { navigate, Match } from '@reach/router';
import {
  auctionIsVoid,
  userCanAddEntertainer,
  maxAuctionDate,
  eventHasExpired,
} from 'utils/event-helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { SearchEntertainerForm } from 'components/pages/user/SearchEntertainer';
import Image from 'components/common/utils/Image';
import { commaNumber, getAverageRatings } from 'utils/helpers';
import Stars from 'components/common/utils/Stars';
import {
  SearchEntertainerDetailsForm,
  AuctionEntertainerDetailsForm,
} from 'components/pages/user/EntertainerDetailsForm';
import { RecommendedEntertainerForm } from './RecommendedEntertainer';

const AddEntertainerDetails = ({ id }) => {
  let auctionIsDisabled = false;
  let type = 'Auction';
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/events/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEvent(data.event);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setLoading(false);
          // TODO: navigate to all events
        });
  }, [id]);

  if (event && auctionIsVoid(event.eventDate)) {
    auctionIsDisabled = true;
    type = 'Recommend';
  }

  if (event && getHiredEntertainerFromStore()) {
    type = 'Search';
  }

  return (
    <BackEndPage title="Add Entertainer">
      <div className="main-app">
        <TopMessage message={event.eventType || ''} />
        {loading ? (
          <LoadingScreen loading={loading} text="Loading Event Details" />
        ) : (
          <>
            <EventDetails event={event} />
            {!userCanAddEntertainer(event.eventDate) ? (
              eventHasExpired(event.eventDate) ? (
                <ExpiredEvent />
              ) : (
                <NoEntertainer />
              )
            ) : (
              <section className="app-content">
                <Match path="/user/events/:id/add-entertainer/new-event">
                  {(props) =>
                    // eslint-disable-next-line react/prop-types
                    props.match && (
                      <AlertMessage
                        message="Your Event has been successfully saved."
                        type="success"
                      />
                    )
                  }
                </Match>
                <AddEntertainerToEvent
                  auctionIsDisabled={auctionIsDisabled}
                  event={event}
                  id={id}
                  type={type}
                />
              </section>
            )}
          </>
        )}
      </div>
    </BackEndPage>
  );
};

AddEntertainerDetails.propTypes = {
  id: PropTypes.string,
};

AddEntertainerDetails.defaultProps = {
  id: null,
};
const AddEntertainerToEvent = ({ auctionIsDisabled, event, id, type }) => {
  const { userDispatch } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({ message: null });
  const [hireType, setHireType] = React.useState(type);
  const hiredEntertainerFromStore = {
    ...getHiredEntertainerFromStore(),
    type: 'Search',
  };
  const [selectedEntertainer, setSelectedEntertainer] = React.useState({
    entertainer: getHiredEntertainerFromStore()
      ? hiredEntertainerFromStore
      : null,
    type,
    language: '',
  });

  const selectedSearchedEntertainer = (entertainer, type, language = null) => {
    setSelectedEntertainer({ entertainer, type, language });
  };
  const handleTypeClick = (selectedType) => setHireType(selectedType);

  const isAuction =
    hireType.toLowerCase() ===
    HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase();

  const isSearch =
    hireType.toLowerCase() ===
    HIRE_ENTERTAINERS_TYPE.search.title.toLowerCase();

  const isRecommend =
    hireType.toLowerCase() ===
    HIRE_ENTERTAINERS_TYPE.recommend.title.toLowerCase();

  let initialValues = {
    lowestBudget: BUDGET[0].value,
    highestBudget: BUDGET[BUDGET.length - 2].value,
    auctionStartDate: { date: Date.now() },
    auctionEndDate: {
      date: maxAuctionDate(event.eventDate || Date.now()),
    },
  };

  if (isRecommend) {
    initialValues.language = selectedEntertainer.language;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(
        addEntertainerSchema(hireType.toLowerCase(), selectedEntertainer), // selected entertainer needed to lowest and highest budget
        initialValues
      )}
      onSubmit={(values, actions) => {
        setLoading(true);
        let entertainerDetails = {
          ...values,
          genre: JSON.stringify(values.genre),
          language: JSON.stringify(values.language),
          ageGroup: JSON.stringify(values.ageGroup),
          eventId: id,
          hireType,
        };

        if (isAuction) {
          entertainerDetails.auctionStartDate = values.auctionStartDate.date;
          entertainerDetails.auctionEndDate = values.auctionEndDate.date;
        } else {
          entertainerDetails.entertainerId = selectedEntertainer.entertainer.id;
          entertainerDetails.entertainerType =
            selectedEntertainer.entertainer.entertainerType;
        }

        axios
          .post('/api/v1/eventEntertainer', entertainerDetails, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'add-entertainer-to-event',
                event: data,
                alert: 'add-entertainer-details-success',
              });
              actions.setSubmitting(false);
              removeHiredEntertainerFromStore();

              navigate(`/user/events/view/${id}`);
            } else {
              setMessage(data.message);
            }
            setLoading(false);
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
            setLoading(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          {loading ? (
            <LoadingScreen loading={loading} text="Saving Event Details" />
          ) : (
            <>
              <AddEntertainerDetailsForm
                auctionIsDisabled={auctionIsDisabled}
                currentlySelectedEntertainer={selectedEntertainer}
                errorMessage={message}
                eventDate={event.eventDate}
                eventLocation={event.state}
                isSearch={isSearch}
                onClick={handleTypeClick}
                selectedSearchedEntertainer={selectedSearchedEntertainer}
                type={hireType}
              />

              {/* show on auction or if entertainer is selected */}
              {(isAuction ||
                (selectedEntertainer.entertainer &&
                  selectedEntertainer.type &&
                  selectedEntertainer.type.toLowerCase() ===
                    hireType.toLowerCase())) && (
                <div className="mt-5">
                  <button
                    className="btn btn-transparent btn-primary text-right btn-lg"
                    onClick={handleSubmit}
                    type="button"
                  >
                    {isAuction ? 'Create Auction' : 'Hire Entertainer'}
                  </button>
                </div>
              )}
              <DisplayFormikState hide {...props} showAll />
            </>
          )}
        </>
      )}
      validationSchema={createSchema(
        addEntertainerSchema(hireType.toLowerCase(), selectedEntertainer)
      )}
    />
  );
};

AddEntertainerToEvent.propTypes = {
  auctionIsDisabled: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const AddEntertainerDetailsForm = ({
  auctionIsDisabled,
  currentlySelectedEntertainer,
  isSearch,
  errorMessage,
  eventDate,
  eventLocation,
  selectedSearchedEntertainer,
  type,
  onClick,
}) => {
  const isAuction =
    type.toLowerCase() === HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase();
  const isRecommend =
    type.toLowerCase() === HIRE_ENTERTAINERS_TYPE.recommend.title.toLowerCase();

  const hasSelectedEntertainer =
    currentlySelectedEntertainer.entertainer &&
    currentlySelectedEntertainer.type &&
    currentlySelectedEntertainer.type.toLowerCase() === type.toLowerCase();

  return (
    <div className="card card-custom card-black card-form">
      <div className="card-body col-md-10">
        <h4 className="card-title blue">Add Entertainer</h4>
        <HireEntertainersCardList
          auctionIsDisabled={auctionIsDisabled}
          onClick={onClick}
          type={type}
        />

        {/* Show Search Form, when search is clicked */}
        {isSearch && !hasSelectedEntertainer && (
          <SearchEntertainerForm
            selectedSearchedEntertainer={selectedSearchedEntertainer}
          />
        )}

        {/* Show RecommendedEntertainer Form, when recommend is clicked */}
        {isRecommend && !hasSelectedEntertainer && (
          <RecommendedEntertainerForm
            location={eventLocation}
            selectedSearchedEntertainer={selectedSearchedEntertainer}
          />
        )}

        {/* show Selected Enteratainer if available for Search */}
        {!isAuction && hasSelectedEntertainer && (
          <>
            <h3
              className={`text-${
                type.toLowerCase() === 'search' ? 'info' : 'success'
              } h6`}
            >
              {getHiredEntertainerFromStore()
                ? 'Hired Entertainer (from Profile)'
                : `Selected Entertainer (from ${type})`}
            </h3>
            <SelectedEntertainer
              entertainer={currentlySelectedEntertainer.entertainer}
              selectedSearchedEntertainer={selectedSearchedEntertainer}
            />
          </>
        )}

        <AlertMessage {...errorMessage} />

        {/* show Offer details for for search and recommend */}
        {(isSearch || isRecommend) && hasSelectedEntertainer && (
          <SearchEntertainerDetailsForm />
        )}

        {/* show Auction form for auction */}
        {isAuction && <AuctionEntertainerDetailsForm eventDate={eventDate} />}
      </div>
    </div>
  );
};

AddEntertainerDetailsForm.propTypes = {
  auctionIsDisabled: PropTypes.bool.isRequired,
  currentlySelectedEntertainer: PropTypes.object,
  errorMessage: PropTypes.object.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventLocation: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
  type: PropTypes.string,
};

AddEntertainerDetailsForm.defaultProps = {
  currentlySelectedEntertainer: null,
  type: null,
};
const HireEntertainersCardList = ({ type, onClick }) => {
  return (
    <Row className="row-eq-height mb-5">
      <label className="col-sm-12" htmlFor="">
        Select Hire Type
      </label>
      {Object.keys(HIRE_ENTERTAINERS_TYPE).map((hireType) => {
        const title = HIRE_ENTERTAINERS_TYPE[hireType].title;
        const isActive = type && type.toLowerCase() === title.toLowerCase();
        return (
          <HireEntertainersCard
            color={HIRE_ENTERTAINERS_TYPE[hireType].color}
            isActive={isActive}
            key={title}
            onClick={onClick}
            title={title}
          />
        );
      })}
      <div className="col-12">
        <div className="text-muted">
          {HIRE_ENTERTAINERS_TYPE[type.toLowerCase()].description}
        </div>
      </div>
    </Row>
  );
};

HireEntertainersCardList.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

HireEntertainersCardList.defaultProps = {
  type: null,
};

const HireEntertainersCard = ({ color, title, isActive, onClick }) => {
  return (
    <Col
      md={{ size: 4, offset: 0 }}
      onClick={() => onClick(title)}
      sm={{ size: 6, offset: 0 }}
    >
      <Card
        className={classNames('select-hire-type', {
          isActive: isActive,
        })}
        color={color}
        hover
      >
        <h6 className="text-center mb-0">
          {/* {isActive && <span className="icon icon-ok text-white" />} */}
          {title}
        </h6>
      </Card>
    </Col>
  );
};

HireEntertainersCard.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <section>
      <small>
        {getLongDate(event.eventDate)} &nbsp;&nbsp;|&nbsp;&nbsp;
        {getTime(event.startTime)} in the {getTimeOfDay(event.startTime)} -{' '}
        {event.eventDuration}{' '}
      </small>
    </section>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    eventType: PropTypes.string,
    eventDate: PropTypes.string,
    startTime: PropTypes.string,
    eventDuration: PropTypes.string,
  }),
};

const NoEntertainer = () => (
  <section className="app-content">
    <AlertMessage message="No enough time to plan for event" type="info" />
    <h4 className="text-blue font-weight-normal mt-4">
      You cannot add any Entertainer to Events less than 3 days
    </h4>
  </section>
);

const ExpiredEvent = () => (
  <section className="app-content">
    <AlertMessage message="Event date has passed" type="error" />
    <h5 className="text-red font-weight-normal mt-4">
      You cannot add any Entertainer to an Expired Event
    </h5>
  </section>
);

export const HiredEntertainerCard = ({ hideTitle }) => {
  const [entertainer, setEntertainer] = React.useState(
    getHiredEntertainerFromStore()
  );
  const handleEntertainerRemoval = () => {
    removeHiredEntertainerFromStore();
    setEntertainer(null);
  };

  if (!entertainer) {
    return null;
  }

  return (
    <>
      {!hideTitle && (
        <h6 className="text-yellow small font-weight-normal">
          Currently Hired Entertainer
        </h6>
      )}
      <SelectedEntertainer
        entertainer={entertainer}
        selectedSearchedEntertainer={handleEntertainerRemoval}
      />
    </>
  );
};

HiredEntertainerCard.propTypes = {
  hideTitle: PropTypes.bool,
};

HiredEntertainerCard.defaultProps = {
  hideTitle: false,
};

export const SelectedEntertainer = ({
  entertainer,
  selectedSearchedEntertainer,
}) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        <tr>
          <td className="align-middle">
            <Image
              className="avatar--medium--small"
              name={entertainer.stageName}
              responsiveImage={false}
              src={entertainer.profileImageURL}
            />
          </td>
          <td className="align-middle">
            <span className="text-muted small--4">Stage name</span>{' '}
            {entertainer.stageName}
          </td>
          <td className="align-middle">
            <span className="text-muted small--4">Type</span>{' '}
            {entertainer.entertainerType}
          </td>
          <td className="align-middle text-gray">
            <span className="text-muted small--4">Location</span>{' '}
            {entertainer.location}
          </td>
          <td className="align-middle">
            <span className="text-muted small--4">Ratings</span>{' '}
            {getAverageRatings(entertainer.ratings) > 0 ? (
              <Stars
                name={entertainer.stageName}
                rating={getAverageRatings(entertainer.ratings)}
              />
            ) : (
              <> No Ratings Yet</>
            )}
          </td>
          <td className="align-middle">
            <span className="text-muted small--4">Charges</span>{' '}
            {commaNumber(entertainer.baseCharges)} -{' '}
            {commaNumber(entertainer.preferredCharges)}
          </td>
          <td className="align-middle">
            <a
              className="btn btn-info btn-sm btn-transparent"
              href={`/entertainers/profile/${entertainer.slug}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Profile
            </a>{' '}
            &nbsp;&nbsp;
            <button
              className="btn btn-danger btn-sm btn-transparent"
              onClick={() => {
                removeHiredEntertainerFromStore();
                selectedSearchedEntertainer({ entertainer: null, type: null });
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

SelectedEntertainer.propTypes = {
  entertainer: PropTypes.object.isRequired,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
};

export default AddEntertainerDetails;
