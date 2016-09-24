import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

import * as actions from '../actions';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTaskInput from '../components/AddTaskInput';
import Navigation from '../components/Navigation';

@connect(
  state => state.tasks,
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)
// A decorator should be able to bind the a plain function but they don't at the moment.
// eslint-disable-next-line react/prefer-stateless-function
export default class RemindrApp extends Component {

  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    filterType: React.PropTypes.string.isRequired,

    actions: React.PropTypes.shape({
      changeFilterType: React.PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAwareView animated={true}>
          <TaskList tasks={this.props.tasks} />
          <AddTaskInput onSubmit={this.props.actions.addTask} />
        </KeyboardAwareView>
        <Navigation
          onPress={this.props.actions.changeFilterType}
          selectedType={this.props.filterType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
