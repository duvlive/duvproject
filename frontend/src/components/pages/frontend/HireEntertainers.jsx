import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import { Row } from 'reactstrap';
import Entertainers from 'components/common/entertainers/Entertainers';
import LoadingScreen from 'components/common/layout/LoadingScreen';

const HireEntertainers = () => {
  const [entertainers, setEntertainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`/api/v1/entertainers`).then(function (response) {
      const { status, data } = response;
      // handle success
      if (status === 200) {
        setEntertainers(data.entertainers);
        setLoading(false);
      }
    });
  }, []);
  return (
    <FrontEndPage title="Hire Entertainers">
      <EntertainerSection entertainers={entertainers} loading={loading} />
    </FrontEndPage>
  );
};

const EntertainerSection = ({ entertainers, loading }) => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        OUR <span>ENTERTAINERS</span>
      </h2>
      {loading ? (
        <LoadingScreen loading={loading} text="Loading Entertainers" />
      ) : (
        <Row className="pt-5">
          <Entertainers.List lists={entertainers} />
        </Row>
      )}
    </div>
  </section>
);

EntertainerSection.propTypes = {
  entertainers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HireEntertainers;
