import DJ from 'data/entertainers/djs';
import { randomItem } from 'utils/helpers';

export default [
  {
    details: {
      eventType: 'Wedding Anniversary',
      eventDate: '2019-08-19',
      startTime: '9:00AM',
      eventDuration: '3:00PM',
      information: 'I want to enjoy this party with my love'
    },
    address: {
      streetLine1: 'D Podium International Event Centre',
      streetLine2: '116, Gbadamosi Street, Lagos',
      lga: 'Alimosho',
      landmark: 'Lagos New Secretariat',
      location: 'Lagos, Nigeria'
    },
    request: [
      {
        entertainer: 'DJ',
        ageGroup: 'all',
        genre: '',
        preferred_language: '',
        lowest_budget: '50,000',
        highestBudget: '50,000',
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
