import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import * as actions from '../actions';
import taskTypes from '../util/taskTypes';

import Header from '../components/Header';
import TaskList from '../components/TaskList';
import AddTaskInput from '../components/AddTaskInput';
import Navigation from '../components/Navigation';
import DeferDialog from '../components/DeferDialog';

@connect(
  state => state.tasks,
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)
export default class RemindrApp extends Component {

  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    filterType: React.PropTypes.string.isRequired,
    actions: React.PropTypes.shape().isRequired,
  }

  render() {
    const isTaskDeferring = !!findIndex(this.props.tasks, task => !task.deferring);
    return (
      <View style={styles.container}>
        {isTaskDeferring && (
          <DeferDialog
            onClose={this.props.actions.clearDeferringTask}
            onTimeChosen={this.props.actions.deferTask}
          />
        )}
        <Header />
        <TaskList
          tasks={this.props.tasks}
          onSwipe={this.props.actions.changeNextTaskType}
          left={taskTypes.DEFERRED}
          right={taskTypes.DONE}
        />
        <AddTaskInput onSubmit={this.props.actions.addTask} />
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
