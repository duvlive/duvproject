import React from 'react';
import TopMessage from 'components/common/TopMessage';
import NoContent from 'components/common/NoContent';
import Image from 'components/common/Image';
import { randomItem, getItems } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import mcLists from 'data/entertainers/mcs';
import lbLists from 'data/entertainers/live-bands';

const EmptyDashboard = () => {
  return (
    <div className="main-app">
      <TopMessage message="Welcome back Mariam," />

      <section className="app-content">
        <div className="row">
          <div className="col-sm-8">
            <div className="card card-custom">
              <div className="card-body">
                <h5 className="card-title green">Upcoming Events</h5>
                <NoContent
                  isButton
                  linkText="Add a New Event"
                  linkTo="/user/events/new"
                  text="You have no Upcoming Events"
                />
              </div>
            </div>
            <EmptyDashboard.AuctionTable
              entertainerList={getItems(djLists, 3)}
            />
          </div>
          <div className="col-sm-4">
            <EmptyDashboard.RecommendedTable
              entertainerList={[randomItem(lbLists), randomItem(mcLists)]}
            />
            <EmptyDashboard.PendingReview entertainer={djLists[7]} />
          </div>
        </div>
      </section>
    </div>
  );
};

EmptyDashboard.PendingReview = ({ entertainer }) => (
  <div className="card card-custom">
    <div className="card-body">
      <NoContent
        isButton
        linkText="You have no current Auctions."
        linkTo="/user/events/new"
        text="Learn how it works"
      />
    </div>
  </div>
);

EmptyDashboard.AuctionTable = ({ entertainerList }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title blue">
        Auction (Recent Bids) <br />
        <small className="small--2 text-gray">
          Celebration Party for Wifey on{' '}
          <span className="text-gray">Apr. 7, 2019</span>
        </small>
      </h5>
      <div className="card-subtitle--3 text-gray mb-3">
        Party DJ
        <span className="float-right small--2 text-gray text-normal">
          Closes on 17th Apr, 2019
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            {entertainerList.map(entertainer => (
              <EmptyDashboard.AuctionRow
                entertainer={entertainer}
                key={entertainer.stage_name + entertainer.id}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">
                <h5 className="main-app__subtitle mt-2 mb-0">
                  Your Budget: N80,000
                </h5>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
);

EmptyDashboard.AuctionRow = ({ entertainer }) => (
  <tr>
    <th scope="row">
      <Image
        className="avatar--small"
        name={entertainer.stage_name}
        src={entertainer.img.profile}
      />
    </th>
    <td>{entertainer.stage_name}</td>
    <td>{entertainer.average_ratings}</td>
    <td className="text-red">N70,000</td>
    <td className="text-right">
      <span className="text-yellow">View Profile</span>
    </td>
    <td className="text-right">
      {' '}
      <span className="text-green">Approve</span>
    </td>
  </tr>
);

EmptyDashboard.RecommendedTable = ({ entertainerList }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title blue">Recommended For You</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            {entertainerList.map(entertainer => (
              <EmptyDashboard.RecommendedRow
                entertainer={entertainer}
                key={entertainer.stage_name + entertainer.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

EmptyDashboard.RecommendedRow = ({ entertainer }) => (
  <tr>
    <td>
      <Image
        className="avatar--small"
        name={entertainer.stage_name}
        src={entertainer.img.profile}
      />
    </td>
    <td>{entertainer.stage_name}</td>
    <td>
      <span className="text-yellow">{entertainer.type}</span>
    </td>
    <td>{entertainer.average_ratings}</td>
  </tr>
);

export default EmptyDashboard;
