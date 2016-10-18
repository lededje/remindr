import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import taskTypes from '../util/taskTypes';

export default function Navigation(props) {
  const types = [taskTypes.DEFERRED, taskTypes.CURRENT, taskTypes.DONE];

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {types.map((type) => {
          const buttonStyles = [styles.button];

          if (type.id === props.selectedType) {
            buttonStyles.push({
              backgroundColor: type.color,
            }, styles.selected);
          }

          // This is the most elegent way of binding the callback with the value.
          // eslint-disable-next-line react/jsx-no-bind
          return (
            <TouchableHighlight
              onPress={props.onPress.bind(null, { filterType: type.id })}
              key={type.id}
              accessibilityLabel={`navigation-${type.id.toLowerCase()}`}
            >
              <Text style={buttonStyles}>{type.name.toUpperCase()}</Text>
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
  selected: {
    color: '#fff',
  },
});
