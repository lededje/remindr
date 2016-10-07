import icons from './icons';
import colors from './colors';

const taskTypes = {
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

const flow = [taskTypes.DEFERRED, taskTypes.CURRENT, taskTypes.DONE, taskTypes.DELETED];

export { taskTypes as default, flow };
