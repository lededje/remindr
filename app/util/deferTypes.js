// Later Today + 3 hours

// This Morning - 9
// This Afternoon - 14
// This Evening - 16
// Tonight - 20

// Tomorrow
// This Weekend
// Next Week
// In a Month
// Some day
// Pick a day

import moment from 'moment';

const START_OF_DAY = moment.duration(8.5, 'hours');
const THIS_MORNING = moment.duration(9, 'hours');
const THIS_AFTERNOON = moment.duration(14, 'hours');
const THIS_EVENING = moment.duration(19, 'hours');
const TONIGHT = moment.duration(20, 'hours');

const deferTypes = {
  // LATER_TODAY: {
  //   id: 'LATER_TODAY',
  //   name: 'Later Today',
  //   calc: time => moment(time)
  //  .endOf('day')
  //  .add(START_OF_DAY)
  //  .format(),
  // },

  THIS_MORNING: {
    id: 'THIS_MORNING',
    name: 'This Morning',
    calc: time => moment(time)
      .startOf('day')
      .add(THIS_MORNING)
      .format(),
  },

  THIS_AFTERNOON: {
    id: 'THIS_AFTERNOON',
    name: 'This Afternoon',
    calc: time => moment(time)
      .startOf('day')
      .add(THIS_AFTERNOON)
      .format(),
  },

  THIS_EVENING: {
    id: 'THIS_EVENING',
    name: 'This Evening',
    calc: time => moment(time)
      .startOf('day')
      .add(THIS_EVENING)
      .format(),
  },

  TONIGHT: {
    id: 'TONIGHT',
    name: 'Tonight',
    calc: time => moment(time)
      .startOf('day')
      .add(TONIGHT)
      .format(),
  },

  TOMORROW: {
    id: 'TOMORROW',
    name: 'Tomorrow',
    calc: time => moment(time)
      .startOf('day')
      .add(1, 'day')
      .add(START_OF_DAY)
      .format(),
  },

  THIS_WEEKEND: {
    id: 'THIS_WEEKEND',
    name: 'This Weekend',
    // add 6 days to make it saturday
    calc: time => moment(time)
      .startOf('week')
      .add(6, 'days')
      .add(START_OF_DAY)
      .format(),
  },

  NEXT_WEEK: {
    id: 'NEXT_WEEK',
    name: 'Next Week',
    calc: time => moment(time).startOf('week')
      .add(1, 'week')
      .add(1, 'day')
      .add(START_OF_DAY)
      .format(),
  },

  NEXT_MONTH: {
    id: 'NEXT_MONTH',
    name: 'Next Month',
    calc: time => moment(time)
      .startOf('month')
      .add(1, 'month')
      .add(START_OF_DAY)
      .format(),
  },

  SOMEDAY: {
    id: 'SOMEDAY',
    name: 'Someday',
    calc: time => undefined,
  },
};

function availableDeferOptions(time) {
  const times = [];

  const sameDayTimes = ['THIS_MORNING', 'THIS_AFTERNOON', 'THIS_EVENING', 'TONIGHT'];

  // This for loop checks to see which defer time is the next to occur today.
  const nearestSameDayTime = sameDayTimes.find((sameDayTime) => {
    if (
      moment(time).diff(
        moment(deferTypes[sameDayTime].calc(time))
        .subtract(1, 'hour')
      ) < 0
    ) {
      return false;
    }
    return true;
  });

  times.push(nearestSameDayTime);

  times.push('TOMORROW');

  // If it's not the weekend, then the weekend, else this next weekend.
  if (moment(time).day() < 5) {
    times.push('THIS_WEEKEND');
  } else {
    times.push('NEXT_WEEKEND');
  }

  times.push('NEXT_WEEK', 'NEXT_MONTH', 'SOMEDAY');

  return times;
}

export { deferTypes, availableDeferOptions };
