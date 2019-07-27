import React from 'react';
import TopMessage from 'components/common/TopMessage';
import events from 'data/events/all-events';
import { randomItem, remainingDays } from 'utils/helpers';
import Image from 'components/common/Image';
import Card from 'components/custom/Card';
import DuvLiveModal from 'components/custom/Modal';
import BackEndPage from 'components/common/BackEndPage';

const ViewEvent = () => {
  const event = randomItem(events);
  return (
    <BackEndPage title="View Event">
      <div className="main-app">
        <TopMessage message="View Event" />

        <section className="app-content">
          <div className="row">
            <div className="col-sm-6">
              <Card color="blue" title={event.details.event_type}>
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <td className="text-red-100">Entertainer</td>
                      <td className="text-right">
                        {event.request[0].entertainer}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Event Date</td>
                      <td className="text-right">{event.details.event_date}</td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Location</td>
                      <td className="text-right">{event.address.location}</td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Remaining Days</td>
                      <td className="text-right">
                        {remainingDays(event.details.event_date)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-red-100">Address</td>
                      <td className="text-right">
                        <address className="text-muted">
                          {event.address.street_line_1} <br />
                          {event.address.street_line_2}, {event.address.lga}{' '}
                          <br />
                          {event.address.landmark}, {event.address.location}
                        </address>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
            <div className="col-sm-6">
              <ViewEvent.EntertainersTable entertainers={event.entertainers} />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

ViewEvent.EntertainersTable = ({ entertainers }) => (
  <Card color="black">
    <h5 className="sub-title text-muted blue">Hired Entertainers</h5>
    <div className="table-responsive">
      <table className="table table-dark">
        <tbody>
          {entertainers.map(entertainer => (
            <ViewEvent.EntertainersRow
              entertainer={entertainer.entertainer}
              key={entertainer.stage_name + entertainer.id}
              payment={entertainer.payment}
            />
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

ViewEvent.EntertainersRow = ({ entertainer, payment }) => (
  <tr>
    <td className="align-middle">
      <Image
        className="avatar--medium"
        name={entertainer.stage_name}
        src={entertainer.img.profile}
      />
    </td>
    <td className="align-middle">{entertainer.stage_name}</td>
    <td className="align-middle text-yellow">{entertainer.type}</td>
    <td className="align-middle">{payment.amount}</td>
    <td className="align-middle">
      <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
    </td>
  </tr>
);

export default ViewEvent;
