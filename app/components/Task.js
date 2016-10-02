import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import autobind from 'autobind-decorator';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 5;

// Listeners
// onSwipeStart
// onDirectionDecided
// onSwipeEnd
// onCloseStart
// onCloseEnd

export default class Task extends Component {

  static propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.number.isRequired,
    nextType: React.PropTypes.string.isRequired,

    onDirectionDecided: React.PropTypes.func,

    // must be a promise
    onSwipeEnd: React.PropTypes.func,
  };

  static defaultProps = {
    onDirectionDecided: () => {},
    onSwipeEnd: () => {},
  };

  constructor(props) {
    super(props);

    this.swipeDirection = undefined;
    this.swipeInitialX = undefined;

    this.state = {
      translateX: new Animated.Value(0),
      direction: 0,
    };
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

  handleOnMoveShouldSetPanResponder(e, gestureState) {
    return Math.abs(gestureState.dx) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD;
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
  resetPosition(animated = true) {
    if (animated) {
      Animated.spring(this.state.translateX, {
        toValue: 0,
        friction: 4,
      }).start();
    } else {
      this.state.translateX.value(0);
    }
  }

  render() {
    return (
      <Animated.View
        style={[styles.item, {
          transform: [
            { translateX: this.state.translateX },
          ],
        }]}
        testID="Task"
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.title}>{this.props.title} - {this.props.nextType}</Text>
        <Text style={styles.timestamp}>{this.props.timestamp}</Text>
      </Animated.View>
    );
  }
}


const styles = StyleSheet.create({
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
});
