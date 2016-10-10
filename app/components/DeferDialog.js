import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import moment from 'moment';

import { deferTypes, availableDeferOptions } from '../util/deferTypes';

export default function DeferDialog(props) {
  const delayTimes = availableDeferOptions();

  return (
    <TouchableHighlight onPress={props.onClose} style={styles.container}>
      <View style={styles.dialog}>
        {delayTimes.map(time => (
          <TouchableHighlight
            style={styles.option}
            key={deferTypes[time].id}
            onPress={props.onTimeChosen.bind(
              null,
              props.task.id,
              deferTypes[time].calc(moment.now()),
            )}
            underlayColor={'orange'}
            activeOpacity={1}
          >
            <Text style={styles.optionLabel}>{deferTypes[time].name}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </TouchableHighlight>
  );
}

DeferDialog.propTypes = {
  onClose: React.PropTypes.func,
  onTimeChosen: React.PropTypes.func,
  task: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
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
