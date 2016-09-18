import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import { connect } from 'react-redux';

import Header from '../components/Header';

@connect(
  state => ({
    state: state.counter,
  }),
  dispatch => ({
    actions: bindActionCreators(taskActions, dispatch),
  })
)
// eslint-disable-next-line react/prefer-stateless-function
export default class RemindrApp extends Component {
  render() {
    return (
      <Header />
    );
  }
}
