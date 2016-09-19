import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as taskActions from '../actions/taskActions';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import Navigation from '../components/Navigation';

@connect(
  state => state.tasks,
  dispatch => ({
    actions: bindActionCreators(taskActions, dispatch),
  }),
)
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
        <TaskList tasks={this.props.tasks} />
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
