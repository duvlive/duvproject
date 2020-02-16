import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import NoContent from 'components/common/utils/NoContent';
import Image from 'components/common/utils/Image';
import { randomItem } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import mcLists from 'data/entertainers/mcs';
import lbLists from 'data/entertainers/live-bands';
import BackEndPage from 'components/common/layout/BackEndPage';

const EmptyDashboard = () => {
  return (
    <BackEndPage title="Not Found">
      <div className="main-app">
        <TopMessage message="Welcome back Mariam," />

        <section className="app-content">
          <div className="row">
            <div className="col-sm-8">
              <div className="card card-custom">
                <div className="card-body">
                  <h5 className="card-title text-green">Upcoming Events</h5>
                  <NoContent
                    isButton
                    linkText="Add a New Event"
                    linkTo="/user/events/new"
                    text="You have no Upcoming Events"
                  />
                </div>
              </div>
              <EmptyDashboard.AuctionTable />
            </div>
            <div className="col-sm-4">
              <EmptyDashboard.RecommendedTable
                entertainerList={[
                  randomItem([...lbLists, ...djLists]),
                  randomItem(mcLists)
                ]}
              />
              <EmptyDashboard.PendingReview />
            </div>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

EmptyDashboard.PendingReview = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Pending Review
      </h5>
      <NoContent text="No pending Reviews." />
    </div>
  </div>
);

EmptyDashboard.AuctionTable = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Auction (Recent Bids)</h5>
      <NoContent
        linkText="Learn how it works"
        linkTo="/user/events/new"
        text="You have no current Auctions."
      />
    </div>
  </div>
);

EmptyDashboard.RecommendedTable = ({ entertainerList }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recommended For You</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            {entertainerList.map(entertainer => (
              <EmptyDashboard.RecommendedRow
                entertainer={entertainer}
                key={entertainer.stageName + entertainer.id}
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
        name={entertainer.stageName}
        src={entertainer.img.profile}
      />
    </td>
    <td>{entertainer.stageName}</td>
    <td>
      <span className="text-yellow">{entertainer.type}</span>
    </td>
    <td>{entertainer.average_ratings}</td>
  </tr>
);

export default EmptyDashboard;
