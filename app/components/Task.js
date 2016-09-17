import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

export default function Task({ counter, increment, decrement }) {
  return (
    <View style={styles.container}>
      <Text>Lorem</Text>
    </View>
  );
}
