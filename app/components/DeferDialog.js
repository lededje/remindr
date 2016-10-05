import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

const delayTimes = [
  { name: 'Later Today' },
  { name: 'Tomorrow' },
  { name: 'This Weekend' },
  { name: 'Next Week' },
  { name: 'Next Month' },
  { name: 'Someday' },
];

export default function DeferDialog() {
  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        {delayTimes.map((time, i) => (
          <TouchableHighlight
            style={styles.option}
            key={time.name}
            onPress={this.onClickHandler}
            underlayColor={'orange'}
            activeOpacity={1}
          >
            <Text style={styles.optionLabel}>{time.name}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

DeferDialog.propTypes = {
  onClick: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  dialog: {
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 90 * 3,
  },
  option: {
    backgroundColor: '#fff',
    padding: 10,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  optionLabel: {
    textAlign: 'center',
  },
});
