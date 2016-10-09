import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  View,
} from 'react-native';
import moment from 'moment';
import autobind from 'autobind-decorator';
import { get } from 'lodash';
import taskTypes from '../util/taskTypes';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 5;

export default class Task extends Component {

  static propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.string.isRequired,
    nextType: React.PropTypes.string.isRequired,
    deferredUntil: React.PropTypes.string,
    deferring: React.PropTypes.bool,

    onDirectionDecided: React.PropTypes.func,

    left: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
    }),
    right: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
    }),

    // must be a promise
    onSwipeEnd: React.PropTypes.func,
  };

  static defaultProps = {
    onDirectionDecided: () => undefined,
    onSwipeEnd: () => undefined,
    nextType: '',
  };

  constructor(props) {
    super(props);

    // Swipe direction is x or y, the state's direction is -1, 0 and 1
    this.swipeDirection = undefined;
    this.swipeInitialX = undefined;
    // This means it's animating out and can no longer be interacted with.
    this.dead = false;

    this.state = {
      translateX: new Animated.Value(0),
      height: new Animated.Value(-1),
      direction: 0,
    };

    // Update the direction when the translateX is updated. Graphically performant.
    this.state.translateX.addListener(this.translateXAnimationListener);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleOnMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: this.handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this.handlePanResponderEnd.bind(this),
      onShouldBlockNativeResponder: () => false,
    });
  }

  componentWillUpdate(nextProps) {
    // If it's currently blank and it wont be after this update...
    if (nextProps.nextType !== '' && this.props.nextType === '') {
      this.closeTask();
      return;
    }
    // If this task was being deferred and now isn't...
    if (nextProps.deferring === false && this.props.deferring === true) {
      this.resetPosition('EASE_OUT');
    }
  }

  @autobind
  translateXAnimationListener({ value }) {
    const { width } = Dimensions.get('window');

    this.setState({
      direction: value < 0 ? -1 : 1,
    });

    // This stops the decay animation, which decays very slowly from triggering all the time.
    // If it's off screen there is no need to keep rerendering. Times it by two for good measure.
    // Also only cancels if it's a decay animation by looking at private variables again.
    if (Math.abs(value) > width * 1 &&
      get(this.state.translateX, '_animation._velocity') !== undefined) {
      this.state.translateX.stopAnimation();
    }
  }

  handleOnMoveShouldSetPanResponder(e, gestureState) {
    if (this.dead) return false;
    return Math.abs(gestureState.dx) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD
      || Math.abs(gestureState.dy) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD;
  }

  handlePanResponderMove(e, gestureState) {
    const { dx, dy } = gestureState;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (this.swipeDirection === undefined) {
      if (absDy > absDx) {
        this.swipeDirection = 'y';
      } else {
        this.swipeDirection = 'x';
      }
      this.props.onDirectionDecided({ id: this.props.id, direction: this.swipeDirection });
    }

    if (this.swipeInitialX === undefined) {
      this.swipeInitialX = dx;
    }

    const newDX = this.swipeInitialX + dx;


    this.state.translateX.setValue(newDX);
  }

  handlePanResponderEnd(e, gestureState) {
    const { width } = Dimensions.get('window');
    const { dx, vx } = gestureState;

    this.swipeDirection = undefined;
    this.swipeInitialX = undefined;

    const velocity = Math.abs(vx) > 0.3 ? vx : 0.4 * this.state.direction;

    Animated.decay(this.state.translateX, {
      velocity,
      deceleration: 0.9999,
    }).start();

    // If there is high velocity (with the correct direction) or the swipe is large enough _and_
    // swiping is enabled for that direction return true.
    const swipedRight = ((vx > 1 && this.state.direction === 1) || (dx >= width * 0.3));
    const swipedLeft = ((vx > 1 && this.state.direction === -1) || (dx <= -(width * 0.3)));

    // -1: left
    //  0: no swipe
    //  1: right
    let swipedDirectionId;
    if (swipedLeft) swipedDirectionId = -1;
    else if (swipedRight) swipedDirectionId = 1;
    else swipedDirectionId = 0;

    this.props.onSwipeEnd({ id: this.props.id, direction: swipedDirectionId })
    .catch(this.resetPosition);
  }

  @autobind
  resetPosition(animated = 'SPRING') {
    switch (animated) {
      case 'SPRING':
        Animated.spring(this.state.translateX, {
          toValue: 0,
          friction: 4,
        }).start();
        break;
      case 'EASE_OUT':
        Animated.timing(this.state.translateX, {
          toValue: 0,
          duration: 350,
          // Ease out.
        }).start();
        break;
      default:
        this.state.translateX.setValue(0);
        break;
    }
  }

  @autobind
  onLayout(event) {
    if (this.state.layoutHeight) return;

    this.setState({
      layoutHeight: event.nativeEvent.layout.height,
    });

    // Todo: Look to see if there is a way to access this value without using the "private" value
    if (this.state.height._value === -1) { // -1 is the "default" value set in the constructor
      this.state.height.setValue(event.nativeEvent.layout.height);
    }
  }

  @autobind
  closeTask() {
    this.dead = true;
    Animated.timing(this.state.height, {
      toValue: 0,
      delay: 150,
    }).start();
  }

  renderDeferredTimetamp() {
    return (
      <View style={styles.flex, { flexDirection: 'row' }}>
        <Text style={[styles.timestamp, styles.icon, { marginRight: 4 }]}>
          {taskTypes.DEFERRED.icon}
        </Text>
        <Text style={[styles.timestamp]}>
          {this.props.deferredUntil && moment(this.props.deferredUntil).fromNow()}
        </Text>
      </View>
    );
  }

  render() {
    const height = this.state.height._value >= 0 ? this.state.height : undefined;

    const leftColor = get(this.props, 'left.color', '#fff');
    const rightColor = get(this.props, 'right.color', '#fff');
    const backgroundColor = this.state.direction === -1 ?
      leftColor : rightColor;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            height,
            backgroundColor,
          },
        ]}
        onLayout={this.onLayout}
      >
        {this.props.right && this.state.direction === 1 && (
          <View
            style={[styles.iconWrapper, {
              left: 25,
            }]}
          >
            <Text style={[styles.icon, styles.taskIcon]}>{this.props.right.icon}</Text>
          </View>
        )}
        {this.props.left && this.state.direction === -1 && (
          <View
            style={[styles.iconWrapper, {
              right: 25,
            }]}
          >
            <Text style={[styles.icon, styles.taskIcon]}>{this.props.left.icon}</Text>
          </View>
        )}
        <Animated.View
          style={[styles.item, {
            height,
            transform: [
              { translateX: this.state.translateX },
            ],
          }]}
          testID="Task"
          {...this.panResponder.panHandlers}
        >
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.timestamp, styles.flex]}>
              {moment(this.props.timestamp).fromNow()}
            </Text>
            {this.renderDeferredTimetamp()}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'orange',
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'GLYPHICONS Halflings',
    backgroundColor: 'transparent',
  },
  taskIcon: {
    color: '#fff',
    fontSize: 20,
  },
  item: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '300',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    fontWeight: '300',
  },
  flex: {
    flex: 1,
  },
});
