import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import autobind from 'autobind-decorator';

export default class AddTaskInput extends Component {

  static propTypes = {
    onSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  @autobind
  onSubmit() {
    this.props.onSubmit({ title: this.state.text });
    this.setState({ text: '' });
  }

  @autobind
  onChange(event) {
    this.setState({ text: event.nativeEvent.text });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Add a task"
          style={styles.input}
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          autoCapitalize="sentences"
          onSubmitEditing={this.onSubmit}
          onChange={this.onChange}
          value={this.state.text}
          testID="Add Task"
        />
        { /* TODO: Magic number works on ios afaik, fix later for android. */}
        <KeyboardSpacer topSpacing={-37.5} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d9dbdb',
    padding: 10,
  },
  input: {
    height: 19,
  },
});
