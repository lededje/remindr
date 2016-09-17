import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Task from '../components/Task';
import * as taskActions from '../actions/taskActions';
import { connect } from 'react-redux';

@connect(
  state => ({
    state: state.counter,
  }),
  dispatch => ({
    actions: bindActionCreators(taskActions, dispatch),
  })
)
export default class RemindrApp extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <Task
        {...actions}
      />
    );
  }
}
