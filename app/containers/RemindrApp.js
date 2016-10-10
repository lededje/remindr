import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import * as actions from '../actions';
import { flow as taskFlow } from '../util/taskTypes';

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
    let deferringTask;
    const filteredTasks = this.props.tasks.filter(task => task.type === this.props.filterType);
    const isTaskDeferring = findIndex(filteredTasks, task => task.deferring) >= 0;
    const currentTaskFlowId = findIndex(taskFlow, flow => flow.id === this.props.filterType);

    if (isTaskDeferring) {
      deferringTask = filteredTasks.find(task => task.deferring);
    }

    return (
      <View style={styles.container}>
        {isTaskDeferring && (
          <DeferDialog
            onClose={this.props.actions.clearDeferringTask}
            onTimeChosen={this.props.actions.deferTask}
            task={deferringTask}
          />
        )}
        <Header />
        <TaskList
          tasks={filteredTasks}
          onSwipe={this.props.actions.changeNextTaskType}
          left={taskFlow[currentTaskFlowId - 1]}
          right={taskFlow[currentTaskFlowId + 1]}
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
