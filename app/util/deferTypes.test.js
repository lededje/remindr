import moment from 'moment';
import { forIn } from 'lodash';
import { deferTypes } from './deferTypes';

describe('Defer Types', () => {
  const tests = [
    {
      id: 'THIS_MORNING',
      pairs: {
        '2000-01-01 05:35:24': '2000-01-01 09:00:00',
        '2000-01-01 10:00:24': '2000-01-01 09:00:00',
      },
    },
    {
      id: 'THIS_AFTERNOON',
      pairs: {
        '2000-01-01 05:35:24': '2000-01-01 15:00:00',
        '2000-01-01 15:32:24': '2000-01-01 15:00:00',
      },
    },
    {
      id: 'THIS_EVENING',
      pairs: {
        '2000-01-01 10:00:00': '2000-01-01 19:00:00',
        '2000-01-01 19:32:24': '2000-01-01 19:00:00',
      },
    },
    {
      id: 'MIDNIGHT',
      pairs: {
        '2000-01-01 10:00:00': '2000-01-02 00:00:00',
      },
    },
    {
      id: 'TOMORROW',
      pairs: {
        '2000-01-01 10:00:00': '2000-01-02 08:30:00',
      },
    },
    {
      id: 'THIS_WEEKEND',
      pairs: {
        '2000-02-01 10:00:00': '2000-02-05 08:30:00',
      },
    },
    {
      id: 'NEXT_WEEK',
      pairs: {
        '2000-01-04 10:00:00': '2000-01-10 08:30:00',
      },
    },
    {
      id: 'NEXT_MONTH',
      pairs: {
        '2000-01-02 10:00:00': '2000-02-01 08:30:00',
      },
    },
    {
      id: 'SOMEDAY',
      pairs: {
        '2000-01-02 10:00:00': undefined,
      },
    },
  ];

  tests.forEach((test) => {
    it(test.name || `should correctly calculate ${test.id} offsets`, () => {
      forIn(test.pairs, (value, key) => {
        const before = deferTypes[test.id].calc(key);
        const after = typeof value === 'string' ? moment(value).format() : value;
        expect(before).toBe(after);
      });
    });
  });
});
