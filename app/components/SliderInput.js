import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Dimensions,
} from 'react-native';
import { clamp } from 'lodash';
import autobind from 'autobind-decorator';

const deviceWidth = Dimensions.get('window').width;

export default class SliderInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onShouldBlockNativeResponder: () => false,
    });
  }

  @autobind
  onMoveShouldSetPanResponder(event) {
    this.setTouchPosition(event);
    return true;
  }

  @autobind
  handlePanResponderMove(event) {
    this.setTouchPosition(event);
  }

  @autobind
  setTouchPosition(event) {
    const { pageX } = event.nativeEvent;
    const padding = (deviceWidth - this.state.width) / 2;
    const locationX = pageX - padding;
    const offsetPercentage = locationX / this.state.width;
    const clampedValue = clamp(offsetPercentage, 0, 1);

    this.setState({ value: clampedValue, locationX }, () => {
      this.props.onChange(this.state.value);
    });
  }

  @autobind
  onLayout(event) {
    const { width } = event.nativeEvent.layout;
    this.setState({ width });
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={styles.wrapper} {...this.panResponder.panHandlers}>
        <Text style={styles.leftLabel}>{this.props.labels[0]}</Text>
        <Text style={styles.rightLabel}>{this.props.labels[1]}</Text>
        <View
          style={[styles.selection, {
            left: clamp(this.state.locationX, 0, this.state.width),
          }]}
        />
      </View>
    );
  }
}

SliderInput.propTypes = {
  onChange: PropTypes.func,
  labels: PropTypes.arrayOf(PropTypes.string),
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    position: 'relative',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  leftLabel: {
    flex: 1,
    fontSize: 13,
  },
  rightLabel: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
  },

  selection: {
    position: 'absolute',
    top: 0,
    borderLeftWidth: 1,
    borderColor: '#000',
    height: 41,
    width: 0,
  },
});
