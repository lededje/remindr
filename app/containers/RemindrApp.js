import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import { connect } from 'react-redux';

import Header from '../components/Header';
import TaskList from '../components/TaskList';

@connect(
  state => ({
    tasks: state.tasks,
  }),
  dispatch => ({
    actions: bindActionCreators(taskActions, dispatch),
  })
)
// eslint-disable-next-line react/prefer-stateless-function
export default class RemindrApp extends Component {

  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <TaskList tasks={this.props.tasks} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
