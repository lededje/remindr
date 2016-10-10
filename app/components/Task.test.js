import 'react-native-mock/mock';

import React from 'react';
import { shallow } from 'enzyme';

import Task from './Task';

const defaultTaskProps = {
  id: 0,
  title: 'Test Title',
  timestamp: '2016-10-14T18:47:57+01:00',
  nextType: '',
};

describe('Task', () => {
  it('correctly sets the direction dependent on the translateX position', () => {
    const wrapper = shallow(<Task {...defaultTaskProps} />);

    const translateX = wrapper.state('translateX');

    translateX.setValue(500);
    expect(wrapper.state('direction')).toEqual(1);

    translateX.setValue(-500);
    expect(wrapper.state('direction')).toEqual(-1);
  });

  it('should ask for the pan responder when the touch delta is high enough', () => {
    const wrapper = shallow(<Task {...defaultTaskProps} />);

    const bigDelta = wrapper.instance().handleOnMoveShouldSetPanResponder(null, {
      dx: 100,
    });

    expect(bigDelta).toBe(true);

    const smallDelta = wrapper.instance().handleOnMoveShouldSetPanResponder(null, {
      dx: 1,
    });

    expect(smallDelta).toBe(false);
  });

  it('should tell trigger a decision about which direction the swipe is going', () => {
    const mockDirectionDecided = jest.fn();

    const wrapper = shallow(
      <Task {...defaultTaskProps} onDirectionDecided={mockDirectionDecided} />
    );

    wrapper.instance().handlePanResponderMove(null, {
      // One of these values must be larger than DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD
      dx: 10,
      dy: 4,
    });

    expect(mockDirectionDecided.mock.calls[0][0].direction).toBe('x');
    expect(mockDirectionDecided.mock.calls[0][0].id).toBe(0);

    const wrapper2 = shallow(
      <Task {...defaultTaskProps} onDirectionDecided={mockDirectionDecided} />
    );

    wrapper2.instance().handlePanResponderMove(null, {
      // One of these values must be larger than DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD
      dx: -1,
      dy: -15,
    });

    expect(mockDirectionDecided.mock.calls[1][0].direction).toBe('y');
    expect(mockDirectionDecided.mock.calls[1][0].id).toBe(0);
  });

  it('should move the task with the gestures coordinates', () => {
    const wrapper = shallow(
      <Task {...defaultTaskProps} />
    );

    const initialX = 0;
    wrapper.instance().swipeInitialX = initialX;

    [5, -100, 200].forEach((x) => {
      wrapper.instance().handlePanResponderMove(null, {
        dx: initialX + x,
      });

      expect(wrapper.state('translateX')._value).toBe(initialX + x);
    });
  });

  it.only('correctly sets the layout height reference upon layout change', () => {
    // The layoutHeight is a reference of the initial height of the task.

    const wrapper = shallow(
      <Task {...defaultTaskProps} />
    );

    wrapper.instance().onLayout({
      nativeEvent: { layout: { height: 1000 } },
    });

    expect(wrapper.state('layoutHeight')).toBe(1000);
  });
});
