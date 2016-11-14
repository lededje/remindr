import icons from './icons';
import colors from './colors';

const taskTypes = {
  CONFIGURE: {
    id: 'CONFIGURE',
    name: 'Configure',
    color: colors.ORANGE,
    icon: icons.SPANNER,
  },
  DEFERRED: {
    id: 'DEFERRED',
    name: 'Deferred',
    color: colors.ORANGE,
    icon: icons.CLOCK,
    sortBy: 'deferredUntil',
    order: 'asc',
  },
  CURRENT: {
    id: 'CURRENT',
    name: 'Current',
    color: colors.BLUE,
    icon: icons.CHECKBOX,
    sortBy: 'timestamp',
    order: 'asc',
  },
  DONE: {
    id: 'DONE',
    name: 'Complete',
    color: colors.GREEN,
    icon: icons.TICK,
    sortBy: 'timestamp',
    oder: 'desc',
  },
  DELETED: {
    id: 'DELETED',
    name: 'Deleted',
    color: colors.RED,
    icon: icons.CROSS,
  },
};

const flow = [
  taskTypes.CONFIGURE,
  taskTypes.DEFERRED,
  taskTypes.CURRENT,
  taskTypes.DONE,
  taskTypes.DELETED,
];

export { taskTypes as default, flow };
