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
