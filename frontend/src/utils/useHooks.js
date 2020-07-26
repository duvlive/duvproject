import React from 'react';
import axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';

export const useEntertainerSelect = (id = 'userId') => {
  const [entertainers, setEntertainers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/v1/admin/entertainers-list`, {
        params: { id },
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEntertainers(data.entertainers);
        }
      })
      .catch(function (error) {
        setEntertainers([]);
      });
  }, [id]);
  return entertainers;
};

export const useBadgesSelect = () => {
  const [badges, setBadges] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/v1/badges-list`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setBadges(data.badges);
        }
      })
      .catch(function (error) {
        setBadges([]);
      });
  }, []);
  return badges;
};

export const useCommissionSelect = () => {
  const [commissions, setCommissions] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`/api/v1/commissions-list`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setCommissions(data.commissions);
        }
      })
      .catch(function (error) {
        setCommissions([]);
      });
  }, []);
  return commissions;
};
