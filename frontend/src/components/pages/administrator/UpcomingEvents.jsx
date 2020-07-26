import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';
import Avatars from 'components/common/utils/Avatars';
import { Formik, Form } from 'formik';
import Button from 'components/forms/Button';
import { feedback } from 'components/forms/form-helper';
import {
  LANGUAGE,
  BUDGET,
  SELECT_ENTERTAINERS_TYPE,
  OCCASSION_TYPE,
  START_TIME,
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import { getStates } from 'data/naija-states-and-lgas';
import Timeago from 'react-timeago';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import {
  getEventDate,
  getTime,
  getTimeOfDay,
  getShortDate,
} from 'utils/date-helpers';
import { countOccurences } from 'utils/helpers';
import Image from 'components/common/utils/Image';
import Input from 'components/forms/Input';
import DatePicker from 'components/forms/DatePicker';
import { getEventDuration } from 'components/common/events/EventDetails';
import { useEntertainerSelect } from 'utils/useHooks';

const EVENTDATE_FILTER = {
  FUTURE: 'future',
  PAST: 'past',
};

const UpcomingEvents = () => {
  return (
    <BackEndPage title="Upcoming Events">
      <AdminList
        apiData="events"
        apiUrl="/api/v1/events-all"
        FilterComponent={EntertainerFilter}
        pageName="Event"
        tableRow={EventsCard}
      />
    </BackEndPage>
  );
};

const EventsCard = ({
  id,
  cancelled,
  cancelledDate,
  eventType,
  eventDate,
  startTime,
  owner,
  lga,
  state,
  entertainers,
}) => {
  const entertainerTypes =
    entertainers &&
    entertainers.reduce(
      (acc, currentEntertainer) => {
        !!currentEntertainer.entertainer
          ? acc.hired.push(currentEntertainer.entertainerType)
          : acc.review.push(currentEntertainer.entertainerType);
        return acc;
      },
      { hired: [], review: [] }
    );

  const entertainersAvatars =
    (entertainers &&
      entertainers
        .filter(({ entertainer }) => !!entertainer)
        .map((event) => event.entertainer)) ||
    [];

  return (
    <>
      <tr className="transparent">
        <td colSpan="6">
          <h4 className="main-app__subtitle">
            <Timeago date={eventDate} />
          </h4>
        </td>
      </tr>
      <tr className={cancelled ? 'strikethrough' : ''}>
        <td className="pl-4">
          <span className="subtitle--2 text-red text-uppercase">
            {getEventDate(eventDate)}
          </span>
          <span className="small--3 text-gray">
            {getTime(startTime)} ({getTimeOfDay(startTime)})
          </span>
        </td>
        <td>
          <div className="table__title text-white">{eventType}</div>
          <span>
            <i className="icon icon-location" />
            {lga}, {state} State
          </span>
        </td>
        <td>
          <span className="text-yellow">
            {entertainerTypes.review.length > 0 ? (
              <>{countOccurences(entertainerTypes.review).join(', ')} needed</>
            ) : (
              'No entertainer in review'
            )}{' '}
            &nbsp;
          </span>
          <span className="small--2">
            {' '}
            {entertainersAvatars.length > 0 ? (
              <>{countOccurences(entertainerTypes.hired).join(', ')} Hired</>
            ) : (
              'No Hired Entertainers'
            )}
            &nbsp;
          </span>
        </td>
        <td className="text-right pr-5">
          {cancelled ? (
            <div className="no-strikethrough d-inline-block">
              <span className="subtitle--2 text-red">
                <i className="icon icon-cancel-circled"></i> Cancelled Event
              </span>
              <span className="small--3 text-gray">
                on {getShortDate(cancelledDate)}
              </span>
            </div>
          ) : (
            <Avatars entertainers={entertainersAvatars} />
          )}
        </td>
        <td className=" align-middle">
          <Image
            className="avatar--medium--small"
            name={`${owner.id}-owner`}
            responsiveImage={false}
            src={owner.profileImageURL || ProfileAvatar}
          />
        </td>
        <td className="text-right no-strikethrough">
          <Link
            className="btn btn-info btn-transparent"
            to={`/admin/events/${id}`}
          >
            View Event
          </Link>
        </td>
      </tr>
    </>
  );
};

EventsCard.propTypes = {
  cancelled: PropTypes.bool,
  cancelledDate: PropTypes.string,
  entertainers: PropTypes.array,
  eventDate: PropTypes.string,
  eventDuration: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.number,
  lga: PropTypes.string,
  owner: PropTypes.object,
  startTime: PropTypes.string,
  state: PropTypes.string,
};

EventsCard.defaultProps = {
  cancelled: false,
  cancelledDate: null,
  id: '0',
  eventDuration: null,
  entertainers: [],
  eventDate: null,
  eventType: null,
  lga: null,
  owner: { id: 0 },
  startTime: null,
  state: null,
};

export const EntertainerFilter = ({ setFilterTerms }) => {
  const noBudget = { label: 'None', value: '0' };
  const anyState = { label: 'Any', value: 'Any' };
  const [displayForm, setDisplayForm] = React.useState({ eventType: false });
  const toggleForm = (value) => {
    setDisplayForm({ [value]: !displayForm[value] });
  };

  const EVENT_DURATION = getEventDuration();
  const entertainers = useEntertainerSelect('entertainerId');
  return (
    <Formik
      initialValues={{
        eventType: '',
        eventDate: '',
        eventDuration: '',
        eventTime: '',
        entertainerId: '', //
        lowestBudget: '', //
        highestBudget: '', //
        language: '', //
        auctionEndDate: '', //
        auctionStartDate: '', //
        hireType: '', //
        state: '', //
        startTime: '', //
        cancelled: '', //
        cancelledDate: '', //
        applicationType: '', //
        paid: '', //
        status: '', //
      }}
      onSubmit={(value, actions) => {
        const selectedEntertainer = entertainers.filter(
          (entertainer) => entertainer.value.toString() === value.entertainerId
        );
        setFilterTerms(
          {
            ...value,
            eventDate: value.eventDate.date
              ? value.eventDate.date.toISOString()
              : '',
            cancelledDate: value.cancelledDate.date
              ? value.cancelledDate.date.toISOString()
              : '',
            startTime: value.startTime.date,
          },
          {
            eventType: `Event Type: ${value.eventType}`,
            eventDate: `Event Date: ${getShortDate(value.eventDate.date)}`,
            startTime: `Start Time: ${getTime(value.startTime)} (${getTimeOfDay(
              value.startTime
            )})`,
            eventDuration: `Event Duration: ${value.eventDuration}`,
            cancelled: `Cancelled : ${value.cancelled}`,
            cancelledDate: `Cancelled Date: ${getShortDate(
              value.cancelledDate.date
            )}`,
            entertainerId: `Entertainer: '${
              (selectedEntertainer[0] && selectedEntertainer[0].label) || 'None'
            }'`,
          }
        );
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form className="card card-custom card-black card-form p-4">
          <>
            <div className="form-row">
              {displayForm.eventType ? (
                <Input
                  formGroupClassName="col-md-6"
                  label="Event Type"
                  labelLink={{
                    onClick: () => toggleForm('eventType'),
                    text: 'Select Event Type',
                    to: '',
                  }}
                  name="eventType"
                  placeholder="Type your Event Type"
                />
              ) : (
                <Select
                  blankOption="Select Event Type"
                  formGroupClassName="col-md-6"
                  label="Event Type"
                  labelLink={{
                    onClick: () => toggleForm('eventType'),
                    text: 'Type Manually',
                    to: '',
                  }}
                  name="eventType"
                  options={OCCASSION_TYPE}
                />
              )}
              <DatePicker
                formGroupClassName="col-md-6"
                label="Event Date"
                name="eventDate"
                placeholder="Event Date"
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Approx. Start Time"
                formGroupClassName="col-md-6"
                label="Start Time"
                name="startTime"
                options={START_TIME}
              />
              <Select
                blankOption="Select Duration"
                formGroupClassName="col-md-6"
                label="Duration of Event (Approx.)"
                name="eventDuration"
                options={EVENT_DURATION}
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Approx. Start Time"
                formGroupClassName="col-md-6"
                label="Cancelled Events"
                name="cancelled"
                options={[
                  { label: 'YES', value: 'YES' },
                  { label: 'NO', value: 'NO' },
                ]}
              />
              <DatePicker
                formGroupClassName="col-md-6"
                label="Cancelled On"
                name="cancelledOn"
                placeholder="Cancelled Date"
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Select Filter"
                formGroupClassName="col-md-6"
                label="Filter By Period"
                name="eventTime"
                options={[
                  { value: EVENTDATE_FILTER.PAST },
                  { value: EVENTDATE_FILTER.FUTURE },
                ]}
              />
              <Select
                blankOption="Select Entertainer"
                formGroupClassName="col-md-6"
                label="Entertainer"
                name="entertainerId"
                optional
                options={entertainers}
                placeholder="Select Entertainer"
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Choose your preferred Entertainer Type"
                formGroupClassName="col-md-6"
                label="Entertainer Type"
                name="entertainerType"
                options={SELECT_ENTERTAINERS_TYPE}
                placeholder="Entertainer Type"
                showFeedback={feedback.ERROR}
              />{' '}
              <Select
                blankOption="Select Option"
                formGroupClassName="col-md-6"
                label="Cancelled Events"
                name="cancelled"
                optional
                options={[
                  { label: 'YES', value: 'YES' },
                  { label: 'NO', value: 'NO' },
                ]}
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-row">
              <Select
                formGroupClassName="col-md-6"
                label="Lowest Charge (in Naira)"
                name="lowestBudget"
                optional
                options={[noBudget, ...BUDGET]}
                showFeedback={feedback.ERROR}
              />
              <Select
                formGroupClassName="col-md-6"
                label="Highest Charges (in Naira)"
                name="highestBudget"
                optional
                options={[noBudget, ...BUDGET]}
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-row">
              <Select
                blankOption="Select State"
                formGroupClassName="col-md-6"
                label="Location"
                name="location"
                optional
                options={[anyState, ...getStates()]}
                showFeedback={feedback.ERROR}
              />
              <MultiSelect
                formGroupClassName="col-md-6"
                label="Language"
                name="language"
                optional
                options={LANGUAGE}
                placeholder="Preferred Language"
                showFeedback={feedback.ERROR}
              />
            </div>
            <div className="form-group">
              <Button
                color="danger"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Filter Events
              </Button>
            </div>
          </>
        </Form>
      )}
    />
  );
};

EntertainerFilter.propTypes = {
  setFilterTerms: PropTypes.func.isRequired,
};

export default UpcomingEvents;
