import React from 'react';
import PropTypes from 'prop-types';
import { getShortDate } from 'utils/date-helpers';

const EventTable = ({ event }) => (
  <div className="card card-custom card-blue">
    <div className="card-body">
      <h5 className="card-title blue">Party DJ</h5>
      <div className="row">
        <div className="col-sm-4">
          <div className="">{event.details.information}</div>

          <span className="">Address</span>
          <address>
            {event.address.streetLine1} <br />
            {event.address.streetLine2} <br />
            {event.address.lga} <br />
            {event.address.landmark} <br />
            {event.address.location}
          </address>
        </div>
        <div className="col-sm-4">
          <div className="table-responsive">
            <table className="table table-dark">
              <tbody>
                <tr>
                  <td>Entertainer</td>
                  <td className="text-right">{event.request[0].entertainer}</td>
                </tr>
                <tr>
                  <td>Event Date</td>
                  <td className="text-right">{event.details.eventDate}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td className="text-right">{event.address.location}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td className="text-right">
                    {event.address.streetLine1} <br />
                    {event.address.streetLine2}, {event.address.lga} <br />
                    {event.address.landmark}, {event.address.location}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="table-responsive">
            <table className="table table-dark">
              <tbody>
                <tr>
                  <td>Budget</td>
                  <td className="text-right">
                    N{event.request[0].lowest_budget} - N
                    {event.request[0].highestBudget}
                  </td>
                </tr>
                <tr>
                  <td>Hire Type</td>
                  <td className="text-right">{event.request[0].hire_type}</td>
                </tr>
                <tr>
                  <td>Bid closes on</td>
                  <td className="text-right">
                    {getShortDate(event.request[0].closes)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventTable.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventTable;
