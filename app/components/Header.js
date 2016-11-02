import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderColor: '#d9dbdb',
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  title: {
    fontSize: 29,
    fontWeight: '300',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remindr</Text>
    </View>
  );
}
