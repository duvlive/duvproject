import DJ from 'data/entertainers/djs';
import { randomItem } from 'utils/helpers';

export default [
  {
    details: {
      event_type: 'Wedding Anniversary',
      event_date: '2019-08-19',
      start_time: '9:00AM',
      end_time: '3:00PM',
      information: 'I want to enjoy this party with my love'
    },
    address: {
      street_line_1: 'D Podium International Event Centre',
      street_line_2: '116, Gbadamosi Street, Lagos',
      lga: 'Alimosho',
      landmark: 'Lagos New Secretariat',
      location: 'Lagos, Nigeria'
    },
    request: [
      {
        entertainer: 'DJ',
        age_group: 'all',
        genre: '',
        preferred_language: '',
        lowest_budget: '50,000',
        highest_budget: '50,000',
        special_request: 'None',
        type: 'auction',
        closes: '2019-12-2'
      }
    ],
    entertainers: [
      {
        entertainer: randomItem(DJ),
        payment: {
          amount: '60,000',
          status: 'PAID'
        },
        status: 'ACCEPTED'
      }
    ],
    payment: {
      total: '60,000',
      status: 'PAID',
      date: '2019-8-21'
    }
  }
];
