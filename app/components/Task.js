import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Task(props) {
  return (
    <View style={styles.item} testID="Task">
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.timestamp}>{props.timestamp}</Text>
    </View>
  );
}

Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number.isRequired,
};

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
