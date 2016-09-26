import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import colors from '../util/colors';

export default function Navigation(props) {
  const types = ['DEFERRED', 'CURRENT', 'DONE'];

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {types.map((type) => {
          const selecteClassName = styles[type.toLowerCase()];
          const buttonStyles = [styles.button];

          if (type === props.selectedType) {
            buttonStyles.push(selecteClassName, styles.selected);
          }

          return (
            <TouchableHighlight
              // This is the most elegent way of binding the callback with the value.
              // eslint-disable-next-line react/jsx-no-bind
              onPress={props.onPress.bind(null, type)}
              key={type}
              accessibilityLabel={`navigation-${type.toLowerCase()}`}
            >
              <Text style={buttonStyles}>{type}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
}

Navigation.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  selectedType: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#d9dbdb',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 12,
    fontSize: 11,
    fontWeight: '300',
  },

  // The selected styles

  deferred: {
    backgroundColor: colors.ORANGE,
  },
  current: {
    backgroundColor: colors.BLUE,
  },
  done: {
    backgroundColor: colors.GREEN,
  },
  selected: {
    color: '#fff',
  },
});
