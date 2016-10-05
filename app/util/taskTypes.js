import icons from './icons';
import colors from './colors';

export default {
  DEFERRED: {
    id: 'DEFERRED',
    name: 'Deferred',
    color: colors.ORANGE,
    icon: icons.CLOCK,
  },
  CURRENT: {
    id: 'CURRENT',
    name: 'Current',
    color: colors.BLUE,
    icon: icons.CHECKBOX,
  },
  DONE: {
    id: 'DONE',
    name: 'Complete',
    color: colors.GREEN,
    icon: icons.TICK,
  },
  DELETED: {
    id: 'DELETED',
    name: 'Deleted',
    color: colors.RED,
    icon: icons.CROSS,
  },
};
